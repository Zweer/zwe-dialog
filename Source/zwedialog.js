var ZweDialog = new Class({
    Implements: [Options, Events],

    options: {
        name: 'zwedialog',
        inject: document.body,
        title: '',

        zIndex: 7000,
        width: 480,
        height: 270,

        destroyOnHide: true,
        overlay: {
            opacity: 0.7
        },

        form: {
            action: '',
            method: 'post'
        },

        showDuration: 400,
        showTransition: Fx.Transitions.Back.easeOut,

        closeDuration: 200,
        closeTransition: Fx.Transitions.Sine.easeOut
    },

    elements: {
        overlay: {},
        box: {},
        form: {},
        html: {},
        buttons: {}
    },

    animations: {
        show: {},
        close: {}
    },

    html: '',
    buttons: [],
    mode: '',

    initialize: function(options)
    {
        this.setOptions(options);

        this._createOverlay();
        this._createElements();
        this._createAnimations();

        this._changeMode();
        this._populateHtml();
        this._populateButtons();

        this.show();
    },

    _createOverlay: function()
    {
        this.elements.overlay = new Overlay(this.options.inject, {
            id: this.options.name + '-overlay-' + String.uniqueID(),
            duration: this.options.showDuration,
            opacity: this.options.overlay.opacity,
            zIndex: this.options.zIndex
        });
    }.protect(),

    _createElements: function()
    {
        this.elements.box = new Element('div', { 'class': this.options.name + '-box' }).adopt(
            new Element('div', { 'class': this.options.name + '-container' }),
            this.elements.form = new Element('form', Object.extend({ 'class': this.options.name + '-form' }, this.options.form)).adopt(
                this.elements.html = new Element('div', { 'class': this.options.name + '-html' }),
                this.elements.buttons = new Element('div', { 'class': this.options.name + '-buttons' })
            )
        ).inject(this.options.inject);
    }.protect(),

    _createAnimations: function()
    {
        this.animations = {
            show: new Fx.Morph(this.elements.box, {
                duration: this.options.showDuration,
                transition: this.options.showTransition
            }),
            close: new Fx.Morph(this.elements.box, {
                duration: this.options.closeDuration,
                transition: this.options.closeTransition
            })
        };
    }.protect(),

    _changeMode: function(mode)
    {
        if(mode && mode != '')
        {
            this.elements.box.removeClass(this.options.name + '-' + this.mode);
            this.mode = mode;
        }

        if(this.mode && this.mode != '')
            this.elements.box.addClass(this.options.name + '-' + this.mode);
    }.protect(),

    _populateHtml: function()
    {
        if(this.html)
            this.elements.html.set('html', this.html);
    }.protect(),

    _populateButtons: function()
    {
        if(this.buttons && typeOf(this.buttons) == 'array' && this.buttons.length > 0)
        {
            this.elements.buttons.empty().adopt(this.buttons);
        }
    }.protect(),

    _reset: function()
    {
        var size = this.elements.box.getSize();

        this.elements.box.setStyles({
            opacity: 0,


        });
    },

    show: function()
    {
        this._reset();

        this.elements.overlay.show();
        this.animations.show.start({
            opacity: 1
        });
    },

    close: function()
    {

    }
});