function copyToClipboard(value) {
  const el = document.createElement('textarea');
  el.value = value;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

function extractText(node) {
  if (node === undefined || node.elements === undefined) {
    return null;
  } else if (node.elements[0].text) {
    return node.elements[0].text;
  } else if(node.elements[0].cdata) {
    return `<![CDATA[${node.elements[0].cdata}]]>`
  }

  return undefined;
}

function extractValuesByXpath(xpath, node, values = []) {
  if (node.xpath === xpath) {
    const value = extractText(node);
    values.push(value);
  } else if (xpath.startsWith(node.xpath)) {
    (node.elements || []).forEach((element) => {
      extractValuesByXpath(xpath, element, values);
    });
  }

  return values;
}

export { copyToClipboard, extractText, extractValuesByXpath };
