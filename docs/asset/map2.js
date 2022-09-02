void async function() {
  let manifest = await fetch_json('/config/manifest.json')
  if (manifest instanceof Error)
    return console.log(manifest)
  let systems = manifest.systems.map(entry => fetch_json(`systems/${entry}.json`))
  systems = await Promise.all(systems)
  if (systems instanceof Error)
    return console.log(systems)
  window.systems = systems
}
()
