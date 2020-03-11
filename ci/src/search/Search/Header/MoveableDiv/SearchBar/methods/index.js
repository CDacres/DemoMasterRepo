
export const getMatches = (array, value) => {
    const what = value.toLowerCase();
    const matches = array.filter((item) => item.toLowerCase().includes(what));
    return matches;
};

export const highlightPortion = (haystack, needle) => {
    const index = haystack.indexOf(needle);
    if (needle !== '') {
        return `<p>${
            haystack.substring(0, index)
        }<b style="color: #00c8ff;">${
            haystack.substring(index, index + needle.length)
        }</b>${
            haystack.substring(index + needle.length)
        }</p>`;
    }
};
