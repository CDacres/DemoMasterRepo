/**
 *
 * Average Position Bidding Tool
 *
 * This script changes keyword bids so that they target specified positions,
 * based on recent performance.
 *
 * Version: 1.5
 * Updated 2015-09-28 to correct for report column name changes
 * Updated 2016-02-05 to correct label reading, add extra checks and
 * be able to adjust maximum bid increases and decreases separately
 * Updated 2016-08-30 to correct label reading from reports
 * Updated 2016-09-14 to update keywords in batches
 * Updated 2016-10-26 to avoid DriveApp bug
 * Google AdWords Script maintained on brainlabsdigital.com
 *
 **/


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

function main() {
    var errors = [];
    try
        {
            // Options
        var currentAccount = AdWordsApp.currentAccount();
        var currentAccountId = currentAccount.getCustomerId();
        var currentAccountName = currentAccount.getName();

        const defaultbreakEvenBid = 3.00;
        // This is the default break even bid for unlabelled keywords.

        const alertBid = 8.00;
        // Bids will not be increased above this maximum naturally. Will alert admin something
        // strange is going on. Can be overridden with override label.

        const globalMinBid = 0.15;
        // Bids will not be decreased below this minimum.

        const defaultRiskAppetite = 1.5;

        const adDisablingOrganicPos = 1;
        // Bids will not be amended in any way for keywords with a higher position than this.

        const unlikelyKeywordTreePositionLabel = "h3jfow04jav3";
        // Because the keyword tree needs to be traverible using potential keywords, have a very unlikely
        // property name for the position.

        var archiveFile = currentAccountId + "-AveKWPos.txt";
        // This name is used to create a file in your Google Drive to store today's performance so far,
        // for reference the next time the script is run.

        const organicDataFileName = "adwords-geo-uk-ranking";
        // Filename of google spreadsheet on google drive (accessible to the script!!!) that contains the
        // organic search term performance.

        const useFirstPageBidsOnKeywordsWithNoImpressions = true;
        // If this is true, then if a keyword has had no impressions since the last time the script was run
        // its bid will be increased to the first page bid estimate (or the firsPageMaxBid if that is smaller).
        // If this is false, keywords with no recent impressions will be left alone.

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        // Advanced Options
        const bidIncreaseProportion = 0.2;
        const bidDecreaseProportion = 0.2;
        const targetPositionTolerance = 0.3;
        const fieldJoin = ",";
        const lineJoin = "$";
        const idJoin = "#";



        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        var files = DriveApp.getFilesByName(organicDataFileName);
        var file;
        var fileCheck = 0;
        var organicFileErrorMessage = 'Can not find file ';
        while (files.hasNext())
        {
            file = files.next();
            fileCheck++;
            organicFileErrorMessage = 'Too many files ';
        }
        if (fileCheck !== 1)
        {
            return organicFileErrorMessage + 'named ' + organicDataFileName;
        }

        var spreadsheet = SpreadsheetApp.open(file);
        var sheets = spreadsheet.getSheets();
        var organicDataSheet = sheets[0];


        var files = DriveApp.getFilesByName(archiveFile);
        if (!files.hasNext()) {
            var archive = DriveApp.createFile(archiveFile, "\n");
            Logger.log("File '" + archiveFile + "' has been created.");
        } else {
            var archive = files.next();
            if (files.hasNext()) {
                return "Error - more than one file named '" + archiveFile + "'";
            }
        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        var labelIds = [];

        var labelIterator = AdWordsApp.labels()
                .withCondition("KeywordsCount > 0")
                .withCondition("LabelName CONTAINS_IGNORE_CASE 'Position '")
                .get();

        while (labelIterator.hasNext()) {
            var label = labelIterator.next();
            if (label.getName().substr(0, "position ".length).toLowerCase() == "position ") {
                labelIds.push(label.getId());
            }
        }

        if (labelIds.length == 0) {
            return "No position labels found.";
        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        var keywordData = {
            //UniqueId1: {LastHour: {Impressions: , AveragePosition: }, ThisHour: {Impressions: , AveragePosition: },
            //CpcBid: , FirstPageCpc: , MaxBid, MinBid, FirstPageMaxBid, PositionTarget: , CurrentAveragePosition:,
            //Criteria:, OrganicPosition, Risk }
        }

        var ids = [];
        var uniqueIds = [];

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //Creates a tree of search terms from a file with their associated position in organic search.

        var keywordTree = {};
        var numRows = organicDataSheet.getLastRow();
        var numColumns = organicDataSheet.getLastColumn();
        var range = organicDataSheet.getRange(1, 1, numRows, numColumns);
        var values = range.getValues();

        for (var j = 0; j < values.length; j++)
        {
            var keywordString = values[j][0];
            var keywords = keywordString.replace(/[&\/\\\[\]#,+()$~%.'":*?<>{}]/g, '').replace(/\s\s+/g, ' ').split(' ');
            if (keywords.length === 1 && keywords[0] === 'keyword')
            {
                continue;
            }
            var position = parseFloat(values[j][1], 10);
            if (keywords.length > 0 && !isNaN(position))
            {
                populateKeywordTree(keywordTree, keywords, position);
            }
        }
        //Logger.log('tree - ' + JSON.stringify(keywordTree, null, 2));

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        var report = AdWordsApp.report(
                'SELECT Id, Criteria, AdGroupId, AdGroupName, CampaignName, Impressions, Clicks, AveragePosition, CpcBid, FirstPageCpc, Labels, BiddingStrategyType, TopOfPageCpc ' +
                'FROM KEYWORDS_PERFORMANCE_REPORT ' +
                'WHERE Status = ENABLED AND AdGroupStatus = ENABLED AND CampaignStatus = ENABLED ' +
                'AND LabelIds CONTAINS_ANY [' + labelIds.join(",") + '] ' +
                'AND AdNetworkType2 = SEARCH ' +
                'AND Device NOT_IN ["HIGH_END_MOBILE"] ' +
                'DURING TODAY'
                );

        var rows = report.rows();
        while (rows.hasNext()) {
            var row = rows.next();

            if (row["BiddingStrategyType"] != "cpc") {
                if (row["BiddingStrategyType"] == "Enhanced CPC"
                        || row["BiddingStrategyType"] == "Target search page location"
                        || row["BiddingStrategyType"] == "Target Outranking Share"
                        || row["BiddingStrategyType"] == "None"
                        || row["BiddingStrategyType"] == "unknown") {
                    addError("Warning: keyword " + row["Criteria"] + "' in campaign '" + row["CampaignName"] +
                            "' uses '" + row["BiddingStrategyType"] + "' rather than manual CPC. This may overrule keyword bids and interfere with the script working.");
                } else {
                    addError("Warning: keyword " + row["Criteria"] + "' in campaign '" + row["CampaignName"] +
                            "' uses the bidding strategy '" + row["BiddingStrategyType"] + "' rather than manual CPC. This keyword will be skipped.");
                    continue;
                }
            }

            var positionTarget = "";
            var breakEvenBid = "";
            var overRide = "";
            var riskAppetite = "";
            var historicBreakEvenBid = "";
            var currentSeoLabel = "";

            if (row["Labels"].trim() == "--") {
                continue;
            }
            var labels = JSON.parse(row["Labels"].toLowerCase()); // Labels are returned as a JSON formatted string
            for (var i = 0; i < labels.length; i++) {
                if (labels[i].substr(0, "position ".length) === "position ") {
                    var positionTarget = parseFloat(labels[i].substr("position ".length - 1).replace(/,/g, "."), 10);
                }
                if (labels[i].substr(0, "be ".length) === "be ") {
                    var breakEvenBid = parseFloat(labels[i].substr("breakeven ".length - 1).replace(/,/g, "."));
                }
                if (labels[i].substr(0, "risk ".length) === "risk ") {
                    var riskAppetite = 1+parseFloat(labels[i].substr("risk ".length - 1).replace(/,/g, "."));
                }
                if (labels[i].substr(0, "ov ".length) === "ov ") {
                    var overRide = parseFloat(labels[i].substr("ov ".length - 1).replace(/,/g, "."));
                }
                if (labels[i].substr(0, "hb ".length) === "hb ") {
                    var historicBreakEvenBid = parseFloat(labels[i].substr("hb ".length - 1).replace(/,/g, "."));
                }
                if (labels[i].substr(0, "seo ".length) === "seo ") {
                    currentSeoLabel = labels[i];
                }
            }

            if (integrityCheck(positionTarget) === -1) {
                Logger.log("Invalid position target '" + positionTarget + "' for keyword '" + row["Criteria"] + "' in campaign '" + row["CampaignName"] + "'");
                continue;
            }
            if (integrityCheckBreakEven(breakEvenBid) === -1) {
                //Logger.log("Invalid breakEvenBid '" + breakEvenBid +  "' for keyword '" + row["Criteria"] + "' in campaign '" + row["CampaignName"] + "'");

                if (integrityCheckBreakEven(historicBreakEvenBid) === -1) {
                    breakEvenBid = defaultbreakEvenBid;
                }
                else
                {
                    breakEvenBid = historicBreakEvenBid;
                }
            }
            if (integrityCheck(riskAppetite) === -1) {
                //Logger.log("Invalid riskAppetite '" + riskAppetite +  "' for keyword '" + row["Criteria"] + "' in campaign '" + row["CampaignName"] + "'");
                riskAppetite = defaultRiskAppetite;
            }
            if (integrityCheck(overRide) === -1) {
                //Logger.log("Invalid override amount '" + overRide +  "' for keyword '" + row["Criteria"] + "' in campaign '" + row["CampaignName"] + "'");
                overRide = 0;
            }

            ids.push(parseFloat(row['Id'], 10));
            var uniqueId = row['AdGroupId'] + idJoin + row['Id'];
            uniqueIds.push(uniqueId);

            keywordData[uniqueId] = {};
            keywordData[uniqueId]['Labels'] = {};
            keywordData[uniqueId]['Labels']['Removal'] = [];
            keywordData[uniqueId]['Labels']['Addition'] = [];
            keywordData[uniqueId]['Criteria'] = row['Criteria'];
            keywordData[uniqueId]['Campaign'] = row['CampaignName'];
            var keywords = row['Criteria'].replace(/[&\/\\\[\]#,+()$~%.'":*?<>{}]/g, '').replace(/\s\s+/g, ' ').split(' ');
            var pos = getKeywordsOrganicPosition(keywordTree, keywords);
            keywordData[uniqueId]['OrganicPosition'] = pos;
            var seoLabelString='seo ';
            if (pos === -1)
            {
              seoLabelString += 'uc';
            }
            else if (pos > 10)
            {
              seoLabelString += '10+';
            }
            else
            {
              seoLabelString += pos;
            }
            if (seoLabelString !== currentSeoLabel)
            {
                if (currentSeoLabel !== "")
                {
                    markLabelForRemoval(uniqueId, currentSeoLabel);
                }
                markLabelForAddition(uniqueId, seoLabelString);
            }
            keywordData[uniqueId]['Risk'] = riskAppetite;
            keywordData[uniqueId]['OverRide'] = overRide;
            keywordData[uniqueId]['BreakEven'] = breakEvenBid;
            keywordData[uniqueId]['HistoricBreakEven'] = historicBreakEvenBid;
            keywordData[uniqueId]['ThisHour'] = {};

            keywordData[uniqueId]['ThisHour']['Impressions'] = parseFloat(row['Impressions'].replace(/,/g, ""), 10);
            keywordData[uniqueId]['ThisHour']['AveragePosition'] = parseFloat(row['AveragePosition'].replace(/,/g, ""), 10);

            keywordData[uniqueId]['CpcBid'] = parseFloat(row['CpcBid'].replace(/,/g, ""), 10);
            keywordData[uniqueId]['Clicks'] = parseFloat(row['Clicks'].replace(/,/g, ""), 10);
            keywordData[uniqueId]['FirstPageCpc'] = parseFloat(row['FirstPageCpc'].replace(/,/g, ""), 10);
            setPositionTargets(uniqueId, positionTarget);
        }

        Logger.log(uniqueIds.length + " labelled keywords found");

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        setBidChange();

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        var currentHour = parseInt(Utilities.formatDate(new Date(), currentAccount.getTimeZone(), "HH"), 10);
        if (currentHour != 0) {
            var data = archive.getBlob().getDataAsString();
            var data = data.split(lineJoin);
            for (var i = 0; i < data.length; i++) {
                data[i] = data[i].split(fieldJoin);
                var uniqueId = data[i][0];
                if (keywordData.hasOwnProperty(uniqueId)) {
                    keywordData[uniqueId]['LastHour'] = {};
                    keywordData[uniqueId]['LastHour']['Impressions'] = parseFloat(data[i][1], 10);
                    keywordData[uniqueId]['LastHour']['AveragePosition'] = parseFloat(data[i][2], 10);
                }
            }
        }
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        findCurrentAveragePosition();

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        //Batch the keyword IDs, as the iterator can't take them all at once
        var idBatches = [];
        var batchSize = 5000;
        for (var i = 0; i < uniqueIds.length; i += batchSize) {
            idBatches.push(uniqueIds.slice(i, i + batchSize));
        }

        Logger.log("Updating keywords");

        // Update each batch
        for (var i = 0; i < idBatches.length; i++) {
            try {
                updateKeywords(idBatches[i]);
            } catch (e) {
                Logger.log("Error updating keywords: " + e);
                Logger.log("Retrying after one minute.");
                Utilities.sleep(60000);
                try {
                    updateKeywords(idBatches[i]);
                } catch (e) {
                    addError("Keyword batch (index " + i + " of " + idBatches.length + ") failed to update with error: " + e.message + ". If this happens regularly look into it.");
                }
            }
        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        Logger.log("Writing file.");
        var content = resultsString();
        archive.setContent(content);
        Logger.log("Finished.");

    }
    catch (e)
    {
        MailApp.sendEmail({
         to: ['william@zipcube.com', 'alistair@zipcube.com'],
         //subject: "Error in Adwords script at " + ScriptApp.getService().getUrl(),
         subject: "Total Adwords Failure",
         htmlBody: "Hi,<br><br>" +
                 "Something has gone very wrong in the adwords script for " + currentAccountName
        });
    }
    if (errors.length>0)
    {
        pingErrorMail(errors);
    }
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


    // Functions

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

    function populateKeywordTree(keywordTreeNode, keywords, position)
    {
        var keywordUnparsed = keywords.shift();
        var keyword = keywordUnparsed.toLowerCase();
        if (!keywordTreeNode.hasOwnProperty(keyword))
        {
            keywordTreeNode[keyword] = {};
        }
        if (keywords.length === 0)
        {
            keywordTreeNode[keyword][unlikelyKeywordTreePositionLabel] = position;
        } else
        {
            populateKeywordTree(keywordTreeNode[keyword], keywords, position);
        }
    }

    function getKeywordsOrganicPosition(keywordTreeNode, originalKeywords)
    {
        var keywords = originalKeywords.slice(0);
        for (var i = 0; i < keywords.length; i++)
        {
            var keyword = keywords[i].toLowerCase();
            if (keywordTreeNode.hasOwnProperty(keyword))
            {
                keywords.splice(i, 1);
                if (keywords.length === 0)
                {
                    return keywordTreeNode[keyword][unlikelyKeywordTreePositionLabel];
                } else
                {
                    return getKeywordsOrganicPosition(keywordTreeNode[keyword], keywords);
                }
            }
        }
        return -1;
    }

    function integrityCheck(target) {
        var n = parseFloat(target, 10);
        if (!isNaN(n) && n >= 1) {
            return n;
        } else {
            return -1;
        }

    }

    function integrityCheckBreakEven(target) {
        var n = parseFloat(target, 10);
        if (!isNaN(n) && n >= 0) {
            return n;
        } else {
            return -1;
        }

    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

    function setPositionTargets(uniqueId, target) {
        if (target !== -1) {
            keywordData[uniqueId]['HigherPositionTarget'] = Math.max(target - targetPositionTolerance, 1);
            keywordData[uniqueId]['LowerPositionTarget'] = target + targetPositionTolerance;
        } else {
            keywordData[uniqueId]['HigherPositionTarget'] = -1;
            keywordData[uniqueId]['LowerPositionTarget'] = -1;
        }
    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

    function bidChange(uniqueId) {
        var suggestedNewBid = -1;
        if (keywordData[uniqueId]['HigherPositionTarget'] === -1) {
            Logger.log("No high pos");
            return suggestedNewBid;
        }
        if (isNaN(keywordData[uniqueId]['FirstPageCpc'])) {
            addError("Warning: first page CPC estimate is not a number for keyword '" + keywordData[uniqueId]['Criteria'] + "'. This keyword will be skipped");
            return suggestedNewBid;
        }

        var originalBid = keywordData[uniqueId]['CpcBid'];
        var maxBid;
        var overRideMode = false;
        if (keywordData[uniqueId]['OverRide'] > 0)
        {
            overRideMode = true;
            maxBid = keywordData[uniqueId]['OverRide'];
        } else
        {
            maxBid = keywordData[uniqueId]['BreakEven'] * keywordData[uniqueId]['Risk'];
        }
        if (keywordData[uniqueId]['OrganicPosition'] === 1 && !overRideMode) {
            Logger.log(keywordData[uniqueId]['Criteria'] + " set to mininum bid owing to good SEO.");
            return globalMinBid;
        }

        var currentPosition = keywordData[uniqueId]['CurrentAveragePosition'];
        var higherPositionTarget = keywordData[uniqueId]['HigherPositionTarget'];
        var lowerPositionTarget = keywordData[uniqueId]['LowerPositionTarget'];

        var bidIncrease = keywordData[uniqueId]['BidIncrease'];
        var bidDecrease = keywordData[uniqueId]['BidDecrease'];
        var firstPageBid = keywordData[uniqueId]['FirstPageCpc'];

        if ((currentPosition > lowerPositionTarget) && (currentPosition !== 0)) {
            var linearBidModel = Math.min(2 * bidIncrease, (2 * bidIncrease / lowerPositionTarget) * (currentPosition - lowerPositionTarget));
            var suggestedNewBid = originalBid + linearBidModel;
        }
        if ((currentPosition < higherPositionTarget) && (currentPosition !== 0)) {
            var linearBidModel = Math.min(2 * bidDecrease, ((-4) * bidDecrease / higherPositionTarget) * (currentPosition - higherPositionTarget));
            var suggestedNewBid = originalBid - linearBidModel;
        }
        if ((currentPosition === 0) && useFirstPageBidsOnKeywordsWithNoImpressions && (originalBid < firstPageBid)) {
            var suggestedNewBid = firstPageBid;
        }

        var throwErrorOnAlert = true;
        if (suggestedNewBid > maxBid)
        {
            suggestedNewBid = maxBid;
            if (suggestedNewBid < firstPageBid)
            {
                if (overRideMode)
                {
                    addError("Keyword '" + keywordData[uniqueId]["Criteria"] + "' in campaign '" + keywordData[uniqueId]["Campaign"] + "' is overriden at "
                            + (Math.round((maxBid + 0.00001) * 100) / 100) + " but that won't make the first page! Assess the situation and either increase or disable.");
                    markLabelForAddition(uniqueId,"warn-over");
                } else
                {
                    addError("Keyword '" + keywordData[uniqueId]["Criteria"] + "' in campaign '" + keywordData[uniqueId]["Campaign"] + "' has a breakeven of "
                            + keywordData[uniqueId]['BreakEven'] + " and a risk profile of " + keywordData[uniqueId]['Risk'] + " making a max bid of "
                            + (Math.round((maxBid + 0.00001) * 100) / 100) + " but that won't make the first page! Assess the situation and either increase or disable.");
                    throwErrorOnAlert = false;
                    markLabelForAddition(uniqueId,"warn-break");
                }
            }
        }
        if (throwErrorOnAlert && !overRideMode && suggestedNewBid > alertBid)
        {
            addError("Keyword '" + keywordData[uniqueId]["Criteria"] + "' in campaign '" + keywordData[uniqueId]["Campaign"] + "' wants to go over the alert Bid of " + alertBid + ". Assess the situation and possibly override.");
            suggestedNewBid = alertBid;
            markLabelForAddition(uniqueId,"warn-alert");
        }

        if (isNaN(suggestedNewBid)) {
            Logger.log("Warning: new bid is not a number for keyword '" + keywordData[uniqueId]['Criteria'] + "'. This keyword will be skipped");
            return -1;
        }
        return suggestedNewBid;
    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

    function findCurrentAveragePosition() {
        for (var x in keywordData) {
            if (keywordData[x].hasOwnProperty('LastHour')) {
                keywordData[x]['CurrentAveragePosition'] = calculateAveragePosition(keywordData[x]);
            } else {
                keywordData[x]['CurrentAveragePosition'] = keywordData[x]['ThisHour']['AveragePosition'];
            }
        }
    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

    function calculateAveragePosition(keywordDataElement) {
        var lastHourImpressions = keywordDataElement['LastHour']['Impressions'];
        var lastHourAveragePosition = keywordDataElement['LastHour']['AveragePosition'];

        var thisHourImpressions = keywordDataElement['ThisHour']['Impressions'];
        var thisHourAveragePosition = keywordDataElement['ThisHour']['AveragePosition'];

        if (thisHourImpressions === 0 && lastHourImpressions === 0) {
            return 0;
        } else {
            var currentPosition = (thisHourImpressions * thisHourAveragePosition + lastHourImpressions * lastHourAveragePosition) / (thisHourImpressions + lastHourImpressions);
            if (currentPosition < 1) {
                return 0;
            } else {
                return currentPosition;
            }
        }
    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

    function keywordUniqueId(keyword) {
        var id = keyword.getId();
        var idsIndex = ids.indexOf(id);
        if (idsIndex === ids.lastIndexOf(id)) {
            return uniqueIds[idsIndex];
        } else {
            var adGroupId = keyword.getAdGroup().getId();
            return adGroupId + idJoin + id;
        }
    }


    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

    function setBidChange() {
        for (var x in keywordData) {
            keywordData[x]['BidIncrease'] = keywordData[x]['CpcBid'] * bidIncreaseProportion / 2;
            keywordData[x]['BidDecrease'] = keywordData[x]['CpcBid'] * bidDecreaseProportion / 2;
        }
    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

    function updateKeywords(idBatch) {
        var keywordIterator = AdWordsApp.keywords()
                .withIds(idBatch.map(function (str) {
                    return str.split(idJoin);
                }))
                .get();

        while (keywordIterator.hasNext()) {
            var keyword = keywordIterator.next();
            var uniqueId = keywordUniqueId(keyword);
            var newBid = bidChange(uniqueId);
            var addedLabels = getLabelsForAddition(uniqueId);
            var removedLabels = getLabelsForRemoval(uniqueId);
            if (newBid !== -1) {
                keyword.setMaxCpc(newBid);
            }
            if (removedLabels.length > 0)
            {
                for (var k=0; k<removedLabels.length; k++)
                {
                   try{
                        keyword.removeLabel(removedLabels[k]);
                    }
                    catch (e)
                    {
                        addError("Removing label failed with error" + e.message);
                    }
                }
            }
            if (addedLabels.length > 0)
            {
                for (var k=0; k<addedLabels.length; k++)
                {
                   try{
                        keyword.applyLabel(addedLabels[k]);
                    }
                    catch (e)
                    {
                        addError("Applying label failed with error" + e.message);
                    }
                }
            }

        }
    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

    function resultsString() {

        var results = [];
        for (var uniqueId in keywordData) {
            var resultsRow = [uniqueId, keywordData[uniqueId]['ThisHour']['Impressions'], keywordData[uniqueId]['ThisHour']['AveragePosition']];
            results.push(resultsRow.join(fieldJoin));
        }

        return results.join(lineJoin);
    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

    function addError(message)
    {
        Logger.log(message);
        errors.push(message);
    }

    function pingErrorMail(errors)
    {
        var message = "";
        message += "<br><br>Account " + currentAccountName + ":<br><br>";
        for (var j = 0; j < errors.length; j++)
        {
            message += errors[j] + "<br>";
        }
        if (message !== "")
        {
            MailApp.sendEmail({
             to: ['william@zipcube.com', 'alistair@zipcube.com'],
             //subject: "Error in Adwords script at " + ScriptApp.getService().getUrl(),
             subject: "Error in Adwords script",
             htmlBody: "Hi,<br><br>" +
                     "Something has gone wrong in the adwords script. Message follows:<br>" +
                     message
            });
        }
    }

    function markLabelForAddition(uniqueId, label)
    {
        keywordData[uniqueId]['Labels']['Addition'].push(label);
    }

    function markLabelForRemoval(uniqueId, label)
    {
        keywordData[uniqueId]['Labels']['Removal'].push(label);
    }

    function getLabelsForAddition(uniqueId)
    {
        return keywordData[uniqueId]['Labels']['Addition'];
    }

    function getLabelsForRemoval(uniqueId)
    {
        return keywordData[uniqueId]['Labels']['Removal'];
    }
}