const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Copy admin folder
  eleventyConfig.addPassthroughCopy("src/admin");

  // Copy images from repo root into _site root
  const images = ["aarthi.jpg","NSknows.jpg","beingmet.jpeg","completesitself.jpeg","GenuineExp.jpg","Neurozenesislogo.jpeg","favicon.png","aarthi-origin.jpeg"];
  images.forEach(img => eleventyConfig.addPassthroughCopy({ [img]: img }));

  // Date filter
  eleventyConfig.addFilter("postDate", (dateObj) => {
    if (!dateObj) return "";
    return DateTime.fromJSDate(new Date(dateObj)).toFormat("MMMM yyyy");
  });

  // Read time filter
  eleventyConfig.addFilter("readTime", (content) => {
    if (!content) return "";
    const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    const mins = Math.ceil(words / 200);
    return mins + " min read";
  });

  // Collections
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/blog/*.md").reverse();
  });

  eleventyConfig.addCollection("offerings", function(collectionApi) {
    const order = ["somatic-experiencing", "womens-moon-circle", "dyad-meditation", "workshops-intensives", "practitioner-training"];
    const items = collectionApi.getFilteredByGlob("./src/offerings/*.md");
    return items.sort((a, b) => {
      return order.indexOf(a.fileSlug) - order.indexOf(b.fileSlug);
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
