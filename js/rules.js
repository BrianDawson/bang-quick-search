chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeNetRequest.updateDynamicRules(
      {
        addRules: [
          {
            id: 1,
            priority: 1,
            action: {
              type: "redirect",
              redirect: {
                url: "https://www.duckduckgo.com/"
              }
            },
            condition: {
              urlFilter: "*://*.google.com/!*",
              resourceTypes: ["main_frame"]
            }
          },
          {
            id: 2,
            priority: 1,
            action: {
              type: "redirect",
              redirect: {
                url: "https://www.duckduckgo.com/"
              }
            },
            condition: {
              urlFilter: "*://*.bing.com/!*",
              resourceTypes: ["main_frame"]
            }
          }
        ],
        removeRuleIds: [1, 2]
      },
      () => {
        console.log("Declarative rules registered.");
      }
    );
  });
  