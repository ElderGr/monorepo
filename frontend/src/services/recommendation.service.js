// getRecommendations.js

const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [], selectedRecommendationType: '' },
  products
) => {
  const productScore = {}
  // const productFeaturesMap = {}
  // const productPreferencesMap = {}

  products.forEach((product) => {
    productScore[product.id] = 0;
    // productFeaturesMap[product.id] = product.features;
    // productPreferencesMap[product.id] = product.preferences;
  });

  products.forEach((product) => {
    product.preferences.forEach((preference) => {
      if (formData.selectedPreferences?.includes(preference)) {
        productScore[product.id] += 1;
      }
    });
    product.features.forEach((feature) => {
      if (formData.selectedFeatures?.includes(feature)) {
        productScore[product.id] += 1;
      }
    });
  });


  const topProductsIds = [];
  if(formData.selectedRecommendationType === 'SingleProduct') {
    let higherScore = 0;
    Object.entries(productScore).forEach(item => {
      if(higherScore <= item[1]){
        topProductsIds[0] = Number(item[0]);
        higherScore = item[1];
      }
    })
  }
  if(formData.selectedRecommendationType === 'MultipleProducts') {
    Object.entries(productScore).forEach((product) => {
      if(product[1] > 0) {
        topProductsIds.push(Number(product[0]));
      }
    });
  }

  const topProducts = products.filter((product) => topProductsIds.includes(product.id));

  return topProducts;
};

export default { getRecommendations };
