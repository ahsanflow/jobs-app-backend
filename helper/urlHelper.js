export const appendDomainToPaths = (data, domain) => {
  if (!data) return null;

  // Function to append domain to a single company's logo and cover
  const appendToCompany = (company) => {
    return {
      ...company,
      logo: company.logo ? `${domain}/${company.logo}` : null,
      cover: company.cover ? `${domain}/${company.cover}` : null,
    };
  };

  // Check if `data` is an array or a single object
  if (Array.isArray(data)) {
    return data.map((company) => appendToCompany(company));
  }

  // Handle single company object
  return appendToCompany(data);
};
