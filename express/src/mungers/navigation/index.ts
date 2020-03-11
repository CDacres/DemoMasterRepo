export const returnDropdownLinkGroups = (dropdown, linkGroups) => {
  const retArray = [];
  dropdown.linkGroups.forEach(linkGroupId => {
    retArray.push(linkGroups.find(linkGroup => linkGroup.id === linkGroupId));
  });
  return retArray;
};
