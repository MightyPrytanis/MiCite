const landingTabs = Array.from(document.querySelectorAll('[data-landing-tab]'));
const landingPanels = Array.from(document.querySelectorAll('[data-landing-panel]'));

function selectLandingTab(tabName) {
  for (const tab of landingTabs) {
    const selected = tab.dataset.landingTab === tabName;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
  }

  for (const panel of landingPanels) {
    panel.hidden = panel.dataset.landingPanel !== tabName;
  }
}

for (const tab of landingTabs) {
  tab.addEventListener('click', () => selectLandingTab(tab.dataset.landingTab));
}
