$.widget("custom.combobox", {
    _create: function () {
        this.wrapper = $("<span>")
            .insertAfter(this.element);
        this._createAutocomplete();
        // this._createShowAllButton();
    },

    _createAutocomplete: function () {
        var selected = this.element.children(":selected"),
            value = selected.val() ? selected.text() : "";
        

        this.input = $("<input>")
            .appendTo(this.wrapper)
            .val(value)
            .addClass('input')
            .attr("placeholder", $('.registryCodePlaceholder').text())
            .autocomplete({
                delay: 0,
                minLength: 3,
                source: $.proxy(
                    this, "_source"
                ),
                change: function(event,ui)
                {
                    if (ui.item==null)
                    {
                        var opt = $('.ui-autocomplete-input').val();
                        
                        var length = $('[data-js="registryCode"] option').filter(function() {
                            return $(this).text() === opt;
                        }).length;

                        if(length == 0)
                            $(this).val('');

                        $(this).focus();
                    }
                }
            })


        this._on(this.input, {
            autocompleteselect: function (event, ui) {
                ui.item.option.selected = true;
                this._trigger("select", event, {
                    item: ui.item.option
                });

                this._trigger("change");
            },

            autocompletechange: "_removeIfInvalid"
        });
    },

    /* _createShowAllButton: function () {
     var input = this.input,
     wasOpen = false;

     $("<a>")
     .attr("tabIndex", -1)
     .attr("title", "Show All Items")
     .tooltip()
     .appendTo(this.wrapper)
     .button({
     icons: {
     primary: "ui-icon-triangle-1-s"
     },
     text: false
     })
     .mousedown(function () {
     wasOpen = input.autocomplete("widget").is(":visible");
     })
     .click(function () {
     input.focus();

     // Close if already visible
     if (wasOpen) {
     return;
     }

     // Pass empty string as value to search for, displaying all results
     input.autocomplete("search", "");
     });
     }, */

    _source: function (request, response) {
        var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");

        var accentMap = {
            "á": "a",
            "é": "e",
            "í": "i",
            "ó": "o",
            "ú": "u",
            "ñ": "n"
        };

        var normalize = function( term ) {
            var ret = "";
            for ( var i = 0; i < term.length; i++ ) {
                ret += accentMap[ term.charAt(i) ] || term.charAt(i);
            }
            return ret;
        };
        
        response(this.element.children("option").map(function ( ) {
            var text = $(this).text();
            if (this.value && (!request.term || matcher.test( text ) || matcher.test( normalize( text )))) return {
                label: text,
                value: text,
                option: this
            };
        }));
/*        response( $.grep( names, function( value ) {
            value = value.label || value.value || value;
            return matcher.test( value ) || matcher.test( normalize( value ) );
        }) );*/
    },

    _removeIfInvalid: function (event, ui) {

        // Selected an item, nothing to do
        if (ui.item) {
            return;
        }

        // Search for a match (case-insensitive)
        var value = this.input.val(),
            valueLowerCase = value.toLowerCase(),
            valid = false;
        this.element.children("option").each(function () {
            if ($(this).text().toLowerCase() === valueLowerCase) {
                this.selected = valid = true;
                return false;
            }
        });

        // Found a match, nothing to do
        if (valid) {
            return;
        }

        // Remove invalid value
/*        this.input.val("")
            .attr("title", value + " didn't match any item")
            .tooltip("open");
        this.element.val("");
        this._delay(function () {
            this.input.tooltip("close").attr("title", "");
        }, 2500);
        this.input.data("ui-autocomplete").term = "";*/
    },

    _destroy: function () {
        this.wrapper.remove();
        this.element.show();
    }
});

$('[data-js="registryCode"]').combobox({});