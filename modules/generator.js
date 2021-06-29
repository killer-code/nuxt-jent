const generator = function () {
  this.nuxt.hook('generate:done', async (context) => {
    const allRoutes = await Array.from(context.generatedRoutes)
    const routes = await allRoutes
    this.nuxt.options.sitemap.routes = await [...routes]
  })
}

export default generator