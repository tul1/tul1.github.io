---
layout: post
title:  "Featured Post"
date:   2017-11-23 11:04:12 +0000
categories: code
category_icon: <i class="fa fa-code" aria-hidden="true"></i>
tags: Featured
image: jantine-doornbos-398339.jpg
---

This is a featured post, it will show up in the featured bar located in the Blog area. Open up this post to get more information on how to set a featured post.

## Title & Subtitle
You can provide a subtitle in your front matter with the code `subtitle: <subtitle>`.  This is great, if you want to provide more information about the post. The subtitle text is coloured in a grey colour.

On the blog area, the featured posts only show the title. When the user clicks the featured post, the subtitle will be shown below the normal title in the post view.

**_Example:_**
<h3 class="text-muted">This is a featured post</h3>

`subtitle: This is a featured post`


## Image

So you can use any image that you like in the post header, all you need to do is specify it in the post front matter with the code `image: <img.jpg>`. Jekyll will automatically look into the folder _assets_ for the image, that matches the name specified on the post front matter.

The header will stretch the image to fit the window, so I'd recommend that you choose an image with a minimum size of 700x438, anything bigger will work just fine.

You can also add images to your post with the `<img>` tag. I've provided you with a `bg` class that you can use, so your images span the whole length of the text area. This will set the image height to 400px so be aware, that some distortion might happen.

**_Example:_**

<img class="bg" src="{{site.url}}/assets/images/jantine-doornbos-398339.jpg">

**Code:** `<img class="bg" src="{{site.url}}/assets/images/jantine-doornbos-398339.jpg">`

## Excerpt

Jekyll will capture the post excerpt automatically (this is usually the first paragraph of the post), so you don't need to do anything to set up the excerpt. This theme will show up to 165 characters of the first paragraph, anything more will be replaced by `...`.

If you want to add your own personalised excerpt, you can add `excerpt: <excerpt>` to the post front matter. Bear in mind, that even if you write your own excerpt, the character count should be under 165 characters.

## Categories & Icon

You can add an icon to be used in front of the category by adding  `category_icon: <html code>` to the post front matter. The theme uses [Font Awesome](http://fontawesome.io) icons and the colour of any icon from Font Awesome will be changed. If you want to use a different icon, I'd recommend you to add a CSS rule and change the colour to `#45C3FF` (the theme's blue).

If you want to create your own icon, you can place it in the folder _assets/images_ and then set the front matter like this: `category_icon: <img src="/assets/images/<icon.svg>">` 

**_Example:_**

<i class="fa fa-code" aria-hidden="true"></i>

`category_icon: <i class="fa fa-code" aria-hidden="true"></i>`

<img src="/assets/images/python.svg" alt="{{page.title | escape}}">

`category_icon: <img src="/assets/images/python.svg">`

## Featured Posts

To mark a post as a featured post all you need to do, is add `tags: Featured` to your front matter and the template will automatically add the latest post to the featured bar located in the Blog page.

The theme is set to show only the last 3 posts marked as featured. This would be the ideal number of featured posts. But if you are just staring the blog, and you don't have enough posts to fill the Featured bar, the theme will resize the div so it doesn't look strange.

**_Example:_**

`tags: Featured`

## Code Highlighting

This theme comes with a customised colour theme for the rouge highlighter. I'd recommend that you specify the language of your code when you post it, otherwise rouge will just show the text in one colour.

To specify the language of your code you can do it in markdown language like this:

```
```python
<your code here>
```

**_Example:_**

_This is how code will look like with this theme._

```python
from foo import bar

def hello(word):
  print("Hello %s" % word)
  if "world" in word:
    return True

# This is a comment

print(hello("world!"))

class AClass:
  def __init__(foo):
    self.foo = foo

def quick_maths:
  if (2 + 2) - 1 == 3:
    return True
```

## Feedback
This was my first attempt at creating a theme from scratch. I hope you like it as much as I did creating it, please do give me some feedback on it, I'd love to hear from you and improve my skills!

Here's where you can find me:

<a href="mailto:fabiorosado@outlook.com"><i class="fa fa-envelope fa-3x" aria-hidden="true"></i> 
<a href="https://github.com/fabiorosado"><i class="fa fa-github fa-3x"></i></a>
<a href="https://twitter.com/fabiorosado_"><i class="fa fa-twitter fa-3x"></i></a>
<a href="https://www.instagram.com/fabiorosado"><i class="fa fa-instagram fa-3x"></i></a>
<a href="https://www.linkedin.com/in/fabiorosado"><i class="fa fa-linkedin fa-3x"></i></a>

**Credits:** [Photo by Jantine Doornbos on Unsplash](https://unsplash.com/photos/HvYy5SEefC8)

