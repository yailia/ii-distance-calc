export function getSearchParams(params: any) {
  const obj: Record<string, any> = {};
  for (const c of params.entries()) {
    const [key, value] = c;
    if (key === "thr") {
      obj["thr"] = params.getAll("thr")
    } else {
      obj[key] = value;
    }
  }
  return obj
}