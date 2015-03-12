#Typographie &nbsp;[![Build Status](https://travis-ci.org/asleepwalker/typographie.svg?branch=master)](https://travis-ci.org/asleepwalker/typographie)

Easy-to-use service for basic typographical preparation of russian texts before web publication.<br>
Also available as an [extension for Google Chrome](https://chrome.google.com/webstore/detail/typographie/afgfkjihapfjmakkehjopdkoljnebape).

## Web service

Available as online service at [typographie.ru](http://typographie.ru/)

<img src="https://cloud.githubusercontent.com/assets/5080313/3941661/a14f1f14-253a-11e4-82a3-988cdd0b297e.png" alt="typographie" />

## Library

You can use Typographie as a standalone library in your PHP project.

```
<?php

	$raw = 'Сервис "Typographie" - подготовка текстов к веб-публикации онлайн (с) 2014-2015';

	require_once('typographie.class.php');
	$engine = new Typographie('inquot,dashes,specials,paragraphs');
	$result = $engine->process($raw);

	echo $result;
	// > Сервис «Typographie» — подготовка текстов к веб-публикации онлайн © 2014–2015

```

Include `lib/typographie.class.php` or install using Composer `asleepwalker/typographie`.

## API

Web service also has API.

For processing text, you need to create HTTP request and send params using POST method to URL http://api.typographie.ru/.

#### Parameters

`raw` (required) : The text to be processed.<br>
`actions` : List of actions, separated by a comma (default — all).<br>
`in` : Mode of the input, plain (by default) or html.<br>
`out` : Mode of the output, plain (by default) or html.

Encoding — UTF-8.

#### Available actions

`inquot` : Nested quotes: «„“» (otherwise — duplicate quotes stashing).<br>
`dashes` : If necessary replace hyphens with dashes and minus signs.<br>
`angles` : Replace asterisks and quotes with degrees, feet, inches.<br>
`dblspace` : Fix duplicate spaces in the text.<br>
`specials` : Insert special characters (from the symbol table).<br>
`mathchars` : Insert mathematical symbols (from the same table).<br>
`punctuation` : Fix punctuation, such as spaces before commas.<br>
`specialspaces` : Fix the wrong skip special characters with spaces.<br>
`nbsp` : Attach short words to following words in the text.<br>
`hellip` : Replace repeating dot symbols with ellipsis.<br>
`paragraphs` : Puts paragraphs (&lt;p&gt;) when converting to HTML (with empty string as a delimeter).<br>
`safehtml` : Do not process the text inside the HTML-tags &lt;code&gt; and &lt;pre&gt;.

List should be comma separated, somethink like `action1,action2,action3`.

#### Response example

The response comes in the JSON format.

```
{"version":"1.2.0","result":"Your text."}
```

#### Error codes

`BAD_REQUEST` : Not received a required parameter — the text for processing (raw).<br>
`ACTIONLIST_EMPTY` : Not specified actions. To perform all available actions just skip the action parameter.<br>
`ACTIONLIST_INVALID` : Non-existent actions found in the list.<br>
`INPUT_MODE_INVALID` : Invalid input text mode.<br>
`OUTPUT_MODE_INVALID` : Invalid output text mode.

## License

The MIT License.