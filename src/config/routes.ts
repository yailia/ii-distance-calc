enum AppRoutes {
  home = "home",
  result = "result"
}

export const appRoutes: Record<AppRoutes, string> = {
  [AppRoutes.home]: "/",
  [AppRoutes.result]: "result",
}