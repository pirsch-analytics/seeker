# Seeker

Our Hugo template for the Pirsch documentation. See https://docs.pirsch.io/.

You can freely use and modify this theme.

## Features

* hierarchical tree navigation
* table of contents
* text search, including keyboard controls (arrow keys to select, enter to open, escape to clear input)
* customizable navigation (head and footer)
* customizable title and copyright text
* mobile support

## Configuration

### Favicon

To use a different favicon, place the `favicon.png` inside the `static` directory of your site.

### Texts

To change the title, copyright texts, and copyright URL, set these parameters inside your `config.toml`:

```toml
[params]
    title = "Title"
    copyright = "Copyright"
    url = "https://example.com/"
    titleColor = "#ffffff"
    themeColor = "#000000"
    twitter = "@PirschAnalytics"
    twitterCard = "product"
```

### Navigation

To change the head and footer navigation, place the navigation entries inside your `config.toml`:

```toml
[menu]
    [[menu.main]]
        name = "Website"
        url = "https://example.com/"
        weight = 1
    [[menu.main]]
        name = "GitHub"
        url = "https://github.com/pirsch-analytics/seeker"
        weight = 2
    [[menu.footer]]
        name = "Privacy"
        url = "https://example.com/privacy"
        weight = 1
    [[menu.footer]]
        name = "Legal"
        url = "https://example.com/legal"
        weight = 2
```

### Search

In order for your content to be indexed an searchable, you need to add the following configuration to your `config.toml`:

```toml
[outputFormats.SearchIndex]
baseName = "search"
mediaType = "application/json"

[outputs]
home = ["HTML", "RSS", "SearchIndex"] # "SearchIndex" needs to be added, HTML and RSS are the default
```

## Web Analytics

You can use [Pirsch](https://pirsch.io/) for web analytics be providing the identification code in the `config.toml`:

```toml
[params]
    pirsch = "identification_code"
```

## License

MIT
