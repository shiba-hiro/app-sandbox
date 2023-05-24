(async () => {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    console.log(`${new Date().toISOString()} the process is running`);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 10000);
    });
  }
})();
