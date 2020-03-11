var zcContainer;
var zcButton;
var zcLink;
var zcPoweredBy;
var zcLogo;
var defaultButtonCss = "font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important; border-right: 0; border-left: 0; border-top: 0; font-weight: 500; font-size: 12px; padding: 12px 18px; line-height: 1; text-align: center; text-decoration: none; text-transform: uppercase; white-space: nowrap; border-radius: 2px; cursor: pointer; outline: none; display: block; margin: 0 auto;";
var customObject = {};
var accessToken;

function customiseWidget(customObject)
{
  createContainer();
  createLink(customObject);
  createText(customObject);
  createLogo(customObject);
  insertButton();
}

function insertButton()
{
  zcContainer.appendChild(zcLink);
  zcContainer.appendChild(zcPoweredBy);
  zcContainer.appendChild(zcLogo);
}

function createContainer()
{
  zcContainer = document.getElementById('zc_widget');
  zcContainer.style="text-align: center; position: relative; max-width: 180px;";
}

function createButton(customObject)
{
  zcButton = document.createElement('button');
  zcButton.id = "zc_book_now";
  zcButton.innerHTML = customObject.widgetText;
  zcButton.style = "color: " + customObject.textColor + "; " + "border-bottom: 1px solid " + customObject.borderBottomColor + "; " + "background: " + customObject.backgroundColor + "; " + defaultButtonCss;
  zcButton.addEventListener("mouseenter", function()
  {
    zcButton.style = "color: " + customObject.textColorHover + "!important; " + "border: 1px solid " + customObject.borderColorHover + "; " + "background: " + customObject.backgroundColorHover + "; " + defaultButtonCss;
  });
  zcButton.addEventListener("mouseout", function()
  {
    zcButton.style = "color: " + customObject.textColor + "; " + "border-bottom: 1px solid " + customObject.borderBottomColor + "; " + "background: " + customObject.backgroundColor + "; " + defaultButtonCss;
  });
}

function createLink(customObject)
{
  zcLink = document.createElement('a');
  zcLink.id = "asset_link";
  zcLink.href = "//www.zipcube.com/" + customObject.domain + "/widget/?token=" + customObject.assetToken;
  zcLink.target = "_blank";
  zcLink.style = "text-decoration: none;";
  createButton(customObject);
  zcLink.appendChild(zcButton);
}

function createText(customObject)
{
  zcPoweredBy = document.createElement('span');
  var defaultTextCss = "font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important; font-size: 8px; vertical-align: middle; margin-right: 3px;";
  zcPoweredBy.innerHTML = 'Powered by ';
  if (customObject.subtextColor == 'white')
  {
    zcPoweredBy.style = 'color: white; ' + defaultTextCss;
  }
  else
  {
    zcPoweredBy.style = 'color: black; ' + defaultTextCss;
  }
}

function createLogo(customObject)
{
  zcLogo = document.createElement('img');
  var url = '//www.zipcube.com/css/images/logo/';
  zcLogo.style="width: 60px; vertical-align: middle;";
  if (customObject.subtextColor == 'white')
  {
    zcLogo.src = url + 'tiny_logo_white_full.svg';
  }
  else
  {
    zcLogo.src = url + 'tiny_logo_black_full.svg';
  }
}
