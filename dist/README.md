[![Build Status](https://travis-ci.com/mindreeper2420/prototype-template.svg?branch=master)](https://travis-ci.com/mindreeper2420/prototype-template)

[![Netlify Status](https://api.netlify.com/api/v1/badges/5947aa18-1f6e-4409-8686-129c225f7781/deploy-status)](https://app.netlify.com/sites/prototypetemplate/deploys)

# Prototype Template

This is a template for creating prototypes. If you wish to use it, please download or fork this repo.

## Features

Built with [PatternFly](https://www.patternfly.org/v4), the open source design system from Red Hat.

If you do not want to use PatternFly, update the following file:

- `sass/site.scss`
  - Edit the file to change from `$global-load-patternfly: true !default;` to `$global-load-patternfly: false !default;`.

  **This will tell the build to not load the PatternFly files and instead load the empty `base.min.css` file for customization.**

## Customization

1. Decide whether you want to use PatternFly 4 as your base, or a fully customized UI.

2. For a PatternFly 4 base, see [Features](#Features) for building.

3. For a fully customized UI, you will want to update the various imports and files associated/linked to `sass/base.scss`.
    - To start, `base.scss` pulls in a **variables** and **utilities** file. Edit these files (or add more to `base.scss`) to build out your UI.

### Site configuration

This site is built using a shared `header.pug` file and a shared `navigation.pug` file.

The `header.pug` file sets the **Page title**, **Favicon**, **Manifest**, and **CSS** file(s). By default, `site.min.css` is the only CSS file referenced in the header.

The `navigation.pug` file controls the navigation layout and content.

```bash
  assets/
    images/
  css/
    base.css
    base.min.css
    patternfly.min.css
    site.css
    site.min.css
  js/
    site.js
  sass/
    utilites/
      _all.scss
      _typography.scss
    variables/
      _all.scss
    base.scss
    site.scss
  src/
    includes/
      header.pug
      navigation.pug
    index.pug
```

When building the site using Travis or Netlify (or by manually publishing), `gulp build` will created `dist/` folder, which will contain the following files:

```bash
  dist/
    assets/
      images/
    css/
      base.min.css
      patternfly.min.css
      site.min.css
    js/
      site.js
    index.html
    manifest.json
    favicon.ico
    favicon.png
    package.json
    README.md
```

## Build Features

- Compile Pug to HTML
- Compile SCSS to CSS
- Browsersync for local development
- Notifications on successful builds (you can turn this off)
- Automatic headers for CSS/JS files
  - this is configured in the `gulpfile.js` file

## Framework

- [Gulp](https://gulpjs.com/)
- [Stylelint](https://stylelint.io/)
- [Travis-ci](https://travis-ci.com/)
- [PatternFly 4](https://github.com/patternfly/patternfly-next)
- [Sass](http://sass-lang.com/guide)
- JS
- [Pug](https://github.com/pugjs/pug)
