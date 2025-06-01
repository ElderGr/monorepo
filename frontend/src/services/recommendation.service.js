// getRecommendations.js

const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [], selectedRecommendationType: '' },
  products
) => {
  const productScore = {}
  const selectedPreferencesSet = new Set(formData.selectedPreferences);
  const selectedFeaturesSet = new Set(formData.selectedFeatures);

  products.forEach((product) => {
    let score = 0;
    product.preferences.forEach((preference) => {
      if (selectedPreferencesSet.has(preference)) {
        score += 1;
      }
    });

    product.features.forEach((feature) => {
      if (selectedFeaturesSet.has(feature)) {
        score += 1;
      }
    });

    productScore[product.id] = score;
  });


  const topProductsIds = [];
  if(formData.selectedRecommendationType === 'SingleProduct') {
    let higherScore = 0;
    products.forEach(product => {
      const score = productScore[product.id];
      if(higherScore <= score){
        topProductsIds[0] = Number(product.id);
        higherScore = score;
      }
    })
  }
  if(formData.selectedRecommendationType === 'MultipleProducts') {
    topProductsIds.push(
      ...products
        .filter(product => productScore[product.id] > 0)
        .map(product => Number(product.id))
    );
  }

  const topProducts = products.filter((product) => topProductsIds.includes(product.id));

  return topProducts;
};

export default { getRecommendations };
