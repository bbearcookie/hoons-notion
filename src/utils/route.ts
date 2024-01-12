const NAVIGATE_EVENT = "navigate";

class NavigationEvent extends CustomEvent<{ prev: string; to: string }> {
  constructor(to: string) {
    super(NAVIGATE_EVENT, { detail: { prev: window.location.pathname, to } });
  }
}

export const initNavigationEvents = (onNavigate: VoidFunction) => {
  window.addEventListener(NAVIGATE_EVENT, (e: Event) => {
    if (e instanceof NavigationEvent) {
      if (e.detail.prev === e.detail.to) {
        history.replaceState(e.detail.prev, "", e.detail.to);
      } else {
        history.pushState(e.detail.prev, "", e.detail.to);
        onNavigate();
      }
    }
  });

  window.addEventListener("popstate", (e: Event) => {
    onNavigate();
  });
};

export const navigate = (to: string) => {
  window.dispatchEvent(new NavigationEvent(to));
};
