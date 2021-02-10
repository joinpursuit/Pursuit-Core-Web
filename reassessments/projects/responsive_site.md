[![Pursuit Logo](https://avatars1.githubusercontent.com/u/5825944?s=200&v=4)](https://pursuit.org)

# Build a responsive site from a Mockup

For reasessments of standards! And practice building responsively.

### Learning Objectives

- Practice building a whole site from a mockup
- Better understanding responsive design strategies & technologies
- Attention to detail 

### Prerequisites

- [Adobe XD free version](https://www.adobe.com/products/xd.html)
    - requires you to create a username and password
- Knowledge of HTML & CSS

---

## Getting Started

1. Download and install Adobe XD if you don't already have it. Create a username and password per the setup instructions.
1. Choose a mockup from the [available options](https://drive.google.com/drive/folders/1onQO0dSD8cYGJO0_lkIJkItLpQQa6dPS?usp=sharing). You can choose easy, medium, or hard. You will need to download each mockup to look at it, or you can click on a folder name, click the 3 dots, and download them all at once.
1. Build that mockup using HTML and CSS and vscode!

## Deliverables

A fully finished responsive website based on one of the mockups you chose.

### Deliverable notes

- Start by getting the general layout working before focusing on details.
- You can spend a lot of time focusing on details, like font sizes, colors, and padding/margin between items. This is good practice, but if you find yourself getting stuck move on to other stuff.
    - You should be able to see the font names in Adobe XD. You can search for those fonts on google fonts, which makes them super easy to include! Not all fonts will be available, so try and find something similar. There is no need to pay for fonts.
- Don't worry about menu dropdowns or interactivity unless you have extra time.
- Include placeholder text and images
    - For images, don't spend a ton of time trying to find the perfect ones. use https://placeholder.com/ or unsplash. You can also copy paste the image from within Adobe XD to MacOS Preview.
        - Highlight the photo in XD that you want to copy and hit Command-C (or Right click -> Copy)
        - Open Preview
        - File -> New From Clipboard (or Command-N)
        - File -> Save
    - For text, you don't have to make it verbatim, but keep roughly the same amount of text as the mockup has, since it affects the design.
- Some mockups have multiple pages, just pick one that you like.
- Some mockups have forms - if you need practice with those, pick a mockup that has a form.

## Technical Requirements

- The site you build must look good on mobile devices (phones), tablets (ipads), and laptops/desktops. See more below about **[what responsive means](#what-responsive-means)**
- Use flexbox or grid or both (yes you can use both!) - depending on what you think is best for the layout.

## Submission Guidelines

Since this is a re-assessment project, you don't have to submit it anywhere. When you're finished, let an IA or instructor know and they can evaluate it.

## What Responsive Means

A responsive website is a website where nothing is broken, squished, or weird-looking at any screen resolution (minimum 320px, max roughly 1500px).

Look at an example website (https://www.washingtonpost.com/) and resize your browser width. See what happens to the content as the viewport shrinks.

- Most items stack
- Some items disappear
- Some items squeeze (a little)
- Occasionally, a few items scroll horizontally (like a carousel)

Think about this when building out your mockup. How will things shrink, resize, and rearrange?

## Debugging & Testing

In chrome, when the devtools window is open, you can emulate various mobile devices to see what your website looks like at different sizes.

* Open devtools
* Click on the "Toggle Device Toolbar" button or press Cmd-Shift-M

![toggle device toolbar](https://github.com/joinpursuit/Pursuit-Core-Web/blob/master/html_css_dom/css_flexbox/assets/device-viewer.png)

* Select your device from the dropdown at the top of the viewport.

For more realistic testing, it's best to use a real device to see how your website looks, rather than just shrinking down your browser window. Luckily, both android and iphone users have options.

### Android Devices

Android users can connect their phones to their laptops via USB and debug using Google Chrome. Follow the instructions [here](https://developers.google.com/web/tools/chrome-devtools/remote-debugging) to get started!

### iOS simulator 

Anyone with a Mac computer can use this method, since it doesn't require a physical phone.

- Install XCode from the App Store if you don't already have it (this takes a looooong time)
- When XCode is launched, click the menu bar and go to Xcode -> Open Developer Tool -> Simulator.
- This will launch a virtual iphone. The first startup is pretty slow usually so give it a few minutes.
- Click the Safari icon in iOS
- Navigate to your `localhost:3000/` in safari or whatever port your server is running on.

## Other Suggestions

- Use the color codes from Adobe XD. You can get the color code (aka hex code) of each item by clicking on it!

### Resources

- [Using media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)
- [Beginners guide to media queries](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Media_queries)
- [Sample grid layout (from above link)](https://mdn.github.io/css-examples/learn/media-queries/grid.html)
- [Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

