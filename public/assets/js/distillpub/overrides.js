// Rewritten in vanilla JS — no jQuery, no MDB dependency
window.addEventListener('load', function () {
  // Style d-footnote shadow DOM elements
  document.querySelectorAll('d-footnote').forEach(function (footnote) {
    try {
      var sup = footnote.shadowRoot && footnote.shadowRoot.querySelector('sup > span');
      if (sup) sup.style.color = 'var(--global-theme-color)';
      var hb = footnote.shadowRoot && footnote.shadowRoot.querySelector('d-hover-box');
      if (hb && hb.shadowRoot) {
        var sheet =
          hb.shadowRoot.querySelector('style') && hb.shadowRoot.querySelector('style').sheet;
        if (sheet) {
          sheet.insertRule(
            '.panel { background-color: var(--global-bg-color) !important; }',
            sheet.cssRules.length,
          );
          sheet.insertRule(
            '.panel { border-color: var(--global-divider-color) !important; }',
            sheet.cssRules.length,
          );
        }
      }
    } catch (e) {}
  });

  // Style d-cite shadow DOM elements
  document.querySelectorAll('d-cite').forEach(function (cite) {
    try {
      var span = cite.shadowRoot && cite.shadowRoot.querySelector('div > span');
      if (span) span.style.color = 'var(--global-theme-color)';
      var citeStyle = cite.shadowRoot && cite.shadowRoot.querySelector('style');
      if (citeStyle && citeStyle.sheet) {
        citeStyle.sheet.insertRule(
          'ul li a { color: var(--global-text-color) !important; text-decoration: none; }',
          citeStyle.sheet.cssRules.length,
        );
        citeStyle.sheet.insertRule(
          'ul li a:hover { color: var(--global-theme-color) !important; }',
          citeStyle.sheet.cssRules.length,
        );
      }
      var chb = cite.shadowRoot && cite.shadowRoot.querySelector('d-hover-box');
      if (chb && chb.shadowRoot) {
        var chbSheet =
          chb.shadowRoot.querySelector('style') && chb.shadowRoot.querySelector('style').sheet;
        if (chbSheet) {
          chbSheet.insertRule(
            '.panel { background-color: var(--global-bg-color) !important; }',
            chbSheet.cssRules.length,
          );
          chbSheet.insertRule(
            '.panel { border-color: var(--global-divider-color) !important; }',
            chbSheet.cssRules.length,
          );
        }
      }
    } catch (e) {}
  });
});
