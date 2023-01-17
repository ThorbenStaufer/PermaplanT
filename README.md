# PermaplanT

PermaplanT is an app for

- Web: Firefox, Chromium
- Larger mobile devices like tablets: Progressive Web App (PWA) Android 9+

## Goals

The overall goals of the app are to enable planning:

1. for a good yield, while
2. providing a diverse and fully functioning ecosystem, and
3. creating living spaces for both animals & humans.

To achieve these goals the app provides, e.g.:

- visual indications for what:
  1. makes sense according to natural constraints
  2. is practical
  3. enhances diversity and supports the ecosystem
- suggestions for:
  - increasing diversity (not only what was used recently)
  - what fits well in the time of the year

## Main Features

- users can have any number of maps
- users can work on the same map together
- maps have a fixed number of layers (see below)
- undo/redo
- copy&paste of selection including succeeding crops across maps
- zoom
- internationalization: English, German
- algorithms for mixed crops, considerations of environmental properties and automatic suggestions
- privacy: no external JavaScript, Fonts, etc.

### Layers

In all layers --- except for base --- past, current or future entities might be intermixed.
While editing any layer other layers might be displayed or hidden.

- Base¹ (import base image, define borders, scale, orientation)
- Landscape¹ (height&sketch of permanent structures like walls, ponds, constructions, beds)
- Labels (allows to put text labels, e.g. names for beds)
- Trees (stem position&height&sketch&type of forest, trees, hedge, bushes etc.)
- Wind (more or less windy places)
- Shadows (more/less sun exposure)
- Infrastructure (cables, wifi spots, pipes, ...)
- Moisture (watering systems, surface water, ...)
- pH Values
- Animals (e.g. where ducks may walk)
- Habitats (especially nesting aids, heaps of stones or leaves, perches)
- Paths (ways, fences, stepping stones)
- Zones
- Plants¹ (individual and fields of plants)
- Warnings¹

¹ Essential (most used) layers: are more prominently shown than others.

### Later Versions

Later features, i.e., out of scope for first version:

- Nextcloud integrations (calender entries, Deck tasks)
- Import/Export
- GPS coordinates
- weather data (warnings on frost etc.)
- automatic shadow and moisture calculation
- 3D modes (forest garden)
- Timelaps of historic garden development
- Social network features (notification that someone entered the garden, Chat&Photograph layer)

## Non-functional Goals

- easy to use
- aesthetic UI
- collaborative use
