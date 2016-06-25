const query = {
  tag: tag => `/${tag}`,
  findByText: (text, tag) => `/${tag}[text()="${text}"]`,
  findByTextContent: (text, tag) => `/${tag}[contains(.,"${text}")]`,
  following: tag => `/following::${tag}`,
  select: num => `[${num}]`,
  first: () => `[1]`,
  last: () => `[last()]`,
  all: () => `/*`,
  attribute: (attr) => `[@${attr}]`,
  custom: str => str
}

export default query
