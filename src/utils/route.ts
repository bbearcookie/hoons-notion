const NAVIGATE_EVENT = "navigate";

class NavigationEvent extends CustomEvent<{ to: string }> {
  constructor(to: string) {
    super(NAVIGATE_EVENT, { detail: { to } });
  }
}

export const initNavigationEvents = (onNavigate: VoidFunction) => {
  window.addEventListener(NAVIGATE_EVENT, (e: Event) => {
    if (e instanceof NavigationEvent) {
      if (window.location.pathname === e.detail.to) {
        history.replaceState(null, "", e.detail.to);
      } else {
        history.pushState(null, "", e.detail.to);
      }

      onNavigate();
    }
  });

  window.addEventListener("popstate", (e: Event) => {
    onNavigate();
  });
};

export const navigate = (to: string) => {
  window.dispatchEvent(new NavigationEvent(to));
};
