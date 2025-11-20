
# Image Carousel Demo  
A simple image carousel component demo using Java + HTL (AEM-style architecture) inspired by the [image-carousel-demo](https://github.com/srishtir88/image-carousel-demo) repository.

## Table of Contents  
- [Overview](#overview)  
- [Features](#features)  
- [Folder Structure](#folder-structure)  
- [Implementation Details](#implementation-details)  
  - [Java Model](#java-model)  
  - [HTL Template](#htl-template)  
  - [ClientLibs (CSS & JS)](#clientlibs-css--js)  
- [Usage](#usage)  
- [License](#license)  

## Overview  
This demo shows how to build an image carousel component where:  
- You can author multiple slides (image + optional caption + optional link)  
- The carousel displays them in a responsive, swipe/arrow-navigable way  
- The architecture follows Java backend + HTL frontend (ideal for AEM or similar CMS)  

## Features  
- Multi-slide support (as many images as you like)  
- Optional caption per slide  
- Optional link per slide (with target)  
- Prev/Next buttons + indicators  
- Responsive layout  
- Basic accessibility support (alt-text, etc)  

## Folder Structure  
/src/main/java/com/example/imagecarousel/
Slide.java
ImageCarouselModel.java

/resources/components/imagecarousel/
imagecarousel.html
clientlibs/
css/styles.css
js/carousel-init.js

Feel free to adapt the package names and folder layout for your project.

## Implementation Details  

### Java Model  
- `Slide.java` — plain POJO representing a slide (image path, alt text, caption, link URL + target).  

package com.demo.core.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(
    adaptables = Resource.class,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class Slide {

    @ValueMapValue
    private String imagePath;

    @ValueMapValue
    private String altText;

    @ValueMapValue
    private String caption;

    @ValueMapValue
    private String linkUrl;

    @ValueMapValue
    private String linkTarget;

    // Default constructor for Sling Models
    public Slide() {}

    // Optional: Constructor to build Slide manually from a Resource
    public Slide(Resource resource) {
        if (resource != null) {
            this.imagePath = resource.getValueMap().get("imagePath", String.class);
            this.altText = resource.getValueMap().get("altText", String.class);
            this.caption = resource.getValueMap().get("caption", String.class);
            this.linkUrl = resource.getValueMap().get("linkUrl", String.class);
            this.linkTarget = resource.getValueMap().get("linkTarget", String.class);
        }
    }

    // Getters
    public String getImagePath() { return imagePath; }
    public String getAltText() { return altText; }
    public String getCaption() { return caption; }
    public String getLinkUrl() { return linkUrl; }
    public String getLinkTarget() { return linkTarget; }

    // Setters (optional—only if you need them during unit testing)
    public void setImagePath(String imagePath) { this.imagePath = imagePath; }
    public void setAltText(String altText) { this.altText = altText; }
    public void setCaption(String caption) { this.caption = caption; }
    public void setLinkUrl(String linkUrl) { this.linkUrl = linkUrl; }
    public void setLinkTarget(String linkTarget) { this.linkTarget = linkTarget; }
}

- `ImageCarouselModel.java` — a Sling-style model that reads a “slides” child resource, iterates children, builds a `List<Slide>`, and exposes it for the HTL template.  

package com.demo.core.models;

import java.util.List;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(
    adaptables = Resource.class,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class ImageCarouselModel {

    @ChildResource(name = "slides")
    private List<Resource> slides;

    public List<ImageSlide> getSlides() {
        return slides != null
            ? slides.stream().map(ImageSlide::new).toList()
            : List.of();
    }

    public static class ImageSlide {

        @ValueMapValue
        private String fileReference;

        @ValueMapValue
        private String altText;

        @ValueMapValue
        private String caption;

        public ImageSlide(Resource resource) {
            this.fileReference = resource.getValueMap().get("fileReference", String.class);
            this.altText = resource.getValueMap().get("altText", String.class);
            this.caption = resource.getValueMap().get("caption", String.class);
        }

        public String getFileReference() { return fileReference; }
        public String getAltText() { return altText; }
        public String getCaption() { return caption; }
    }
}


### HTL Template (`imagecarousel.html`)  
- Iterates over the slides list via `data-sly-list`.  
- Renders `<img>` tags (with alt text), optionally wraps image in `<a>` if link is present.  
- Renders caption if provided.  
- Renders carousel container with Prev/Next buttons and slide indicators.  

### ClientLibs (CSS & JS)  
- `styles.css` — base styles: carousel container, slides list, nav buttons, indicators.  
- `carousel-init.js` — basic JavaScript to initialize the carousel behaviour (or integrate a library like Swiper/Slick if you prefer).  
- Ensure the clientlib category is included on the page where the component is used.

## Usage  
1. Include the component on a page (drag in, or embed in your template).  
2. Author slides by specifying image, alt text, optional caption, optional link.  
3. Save & Publish (in AEM context) or simply view the page if you’re running as a standalone demo.  
4. The carousel should render, respond to Prev/Next, and resize responsively.

## License  
This project is open source.
