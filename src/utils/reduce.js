export const reduceItems = (posts, key) => {
  return posts.reduce((acc, post) => {
    post[key].forEach((item) => {
      acc.push(item);
    });
    return acc;
  }, []);
};
