export async function onAppLoading() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
