const options = [];
for (let i = 0; i < 50; i += 1) {
  options.push({
    value: i + 1,
    label: `Option ${i + 1}`,
  });
}

const sleep = ms =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

const optionsPerPage = 10;

const loadOptions = async (search, page) => {
  await sleep(1000);

  let filteredOptions;
  if (!search) {
    filteredOptions = options;
  } else {
    const searchLower = search.toLowerCase();

    filteredOptions = options.filter(({ label }) => label.toLowerCase().includes(searchLower));
  }

  const hasMore = Math.ceil(filteredOptions.length / optionsPerPage) > page;
  const slicedOptions = filteredOptions.slice((page - 1) * optionsPerPage, page * optionsPerPage);

  return {
    options: slicedOptions,
    hasMore,
  };
};

export default loadOptions;
