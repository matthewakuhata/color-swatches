<div id="top"></div>

<br />
<div align="center">
    <h3 align="center">SWATCHES</h3>
</div>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone git@github.com:matthewakuhata/swatches-app.git
   ```
2. Install NPM packages

   ```sh
   npm install
   ```

   ```

   ```

3. Start server and client
   ```
   cd /backend npm run start
   cd /frontend npm run start
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ABOUT THE PROJECT -->

## About The Project

React SPA to generate random colors in random color spaces.
UI Inspired by [coolors](https://coolors.co/generate).

To generate a color pallete simply press spacebar!

Supported Color Spaces:

1. RGB
2. HSL

## Extending Color Spaces

Steps:

1. Update color types.

   Adding support for color space in ./backend/src/types/index.ts.
   At a minimum the enum ColorType must be updated with a new color space to ensure the generator works correctly.

2. Create new color space class.

   Similar to RGBColor & HSLColor we can create a color space using getRandomInteger function

3. Update the switch statement in the api to include new color space.

   Allows new color space to be generated randomly.

With these changes the frontend should handle new color spaces without changes.

## API

GET /api/v1/color?limit=5

Request Params:

- limit: number default 5

```json
[
  {
    "type": "rgb",
    "colorString": " rgb(255, 255, 255);",
    "hex": "#FFFFFF",
    "tone": "light",
    "red": 255,
    "green": 255,
    "blue": 255
  },
  {
    "type": "hsl",
    "colorString": " hsl(360, 100, 100);",
    "hex": "#FFFFFF",
    "tone": "light",
    "hue": 360,
    "saturation": 100,
    "lightness": 100
  }
  // Three more colors in random combinations of RGB and HSL
]
```

## Built With

- Typescript
- ReactJS
- NodeJs
- Express

<p align="right">(<a href="#top">back to top</a>)</p>

## TODOs

- [x] Add locking to colors.
- [] Allow adding more colors.
- [] Unit test frontend components

<p align="right">(<a href="#top">back to top</a>)</p>
