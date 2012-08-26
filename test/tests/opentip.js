// Generated by CoffeeScript 1.3.3
var $;

$ = ender;

describe("Opentip", function() {
  var adapter;
  adapter = null;
  beforeEach(function() {
    adapter = Opentip.adapters["native"];
    return Opentip.adapter = adapter;
  });
  afterEach(function() {
    return $(".opentip-container").remove();
  });
  describe("constructor()", function() {
    before(function() {
      return sinon.stub(Opentip.prototype, "_init");
    });
    after(function() {
      return Opentip.prototype._init.restore();
    });
    it("arguments should be optional", function() {
      var element, opentip;
      element = adapter.create("<div></div>");
      opentip = new Opentip(element, "content");
      expect(opentip.content).to.equal("content");
      expect(adapter.unwrap(opentip.triggerElement)).to.equal(adapter.unwrap(element));
      opentip = new Opentip(element, "content", "title", {
        hideOn: "click"
      });
      expect(opentip.content).to.equal("content");
      expect(opentip.triggerElement).to.equal(element);
      expect(opentip.options.hideOn).to.equal("click");
      expect(opentip.options.title).to.equal("title");
      opentip = new Opentip(element, {
        hideOn: "click"
      });
      expect(opentip.triggerElement).to.equal(element);
      expect(opentip.options.hideOn).to.equal("click");
      expect(opentip.content).to.equal("");
      return expect(opentip.options.title).to.equal(void 0);
    });
    it("should always use the next tip id", function() {
      var element, opentip, opentip2, opentip3;
      element = document.createElement("div");
      Opentip.lastId = 0;
      opentip = new Opentip(element, "Test");
      opentip2 = new Opentip(element, "Test");
      opentip3 = new Opentip(element, "Test");
      expect(opentip.id).to.be(1);
      expect(opentip2.id).to.be(2);
      return expect(opentip3.id).to.be(3);
    });
    it("should use the href attribute if AJAX and an A element", function() {
      var element, opentip;
      element = $("<a href=\"http://testlink\">link</a>").get(0);
      opentip = new Opentip(element, {
        ajax: true
      });
      expect(opentip.options.ajax).to.be.a("object");
      return expect(opentip.options.ajax.url).to.equal("http://testlink");
    });
    it("should disable AJAX if neither URL or a link HREF is provided", function() {
      var element, opentip;
      element = $("<div>text</div>").get(0);
      opentip = new Opentip(element, {
        ajax: true
      });
      return expect(opentip.options.ajax).to.not.be.ok();
    });
    it("should disable a link if the event is onClick", function() {
      var element, opentip;
      sinon.spy(adapter, "observe");
      element = $("<a href=\"http://testlink\">link</a>").get(0);
      opentip = new Opentip(element, {
        showOn: "click"
      });
      expect(adapter.observe.calledOnce).to.be.ok();
      expect(adapter.observe.getCall(0).args[1]).to.equal("click");
      return adapter.observe.restore();
    });
    it("should take all options from selected style", function() {
      var element, opentip;
      element = document.createElement("div");
      opentip = new Opentip(element, {
        style: "glass",
        showOn: "click"
      });
      expect(opentip.options.showOn).to.equal("click");
      expect(opentip.options.className).to.equal("glass");
      return expect(opentip.options.stemLength).to.equal(5);
    });
    it("should set the options to fixed if a target is provided", function() {
      var element, opentip;
      element = document.createElement("div");
      opentip = new Opentip(element, {
        target: true,
        fixed: false
      });
      return expect(opentip.options.fixed).to.be.ok();
    });
    it("should use provided stem", function() {
      var element, opentip;
      element = document.createElement("div");
      opentip = new Opentip(element, {
        stem: "bottom",
        tipJoin: "topLeft"
      });
      return expect(opentip.options.stem.toString()).to.eql("bottom");
    });
    it("should take the tipJoint as stem if stem is just true", function() {
      var element, opentip;
      element = document.createElement("div");
      opentip = new Opentip(element, {
        stem: true,
        tipJoint: "top left"
      });
      return expect(opentip.options.stem.toString()).to.eql("topLeft");
    });
    it("should use provided target", function() {
      var element, element2, opentip;
      element = adapter.create("<div></div>");
      element2 = adapter.create("<div></div>");
      opentip = new Opentip(element, {
        target: element2
      });
      return expect(opentip.options.target).to.equal(element2);
    });
    it("should take the triggerElement as target if target is just true", function() {
      var element, opentip;
      element = adapter.create("<div></div>");
      opentip = new Opentip(element, {
        target: true
      });
      return expect(opentip.options.target).to.equal(element);
    });
    it("currentStemPosition should be set to inital stemPosition", function() {
      var element, opentip;
      element = adapter.create("<div></div>");
      opentip = new Opentip(element, {
        stem: "topLeft"
      });
      return expect(opentip.currentStemPosition.toString()).to.eql("topLeft");
    });
    it("delay should be automatically set if none provided", function() {
      var element, opentip;
      element = document.createElement("div");
      opentip = new Opentip(element, {
        delay: null,
        showOn: "click"
      });
      expect(opentip.options.delay).to.equal(0);
      opentip = new Opentip(element, {
        delay: null,
        showOn: "mouseover"
      });
      return expect(opentip.options.delay).to.equal(0.2);
    });
    it("the targetJoint should be the inverse of the tipJoint if none provided", function() {
      var element, opentip;
      element = document.createElement("div");
      opentip = new Opentip(element, {
        tipJoint: "left"
      });
      expect(opentip.options.targetJoint.toString()).to.eql("right");
      opentip = new Opentip(element, {
        tipJoint: "top"
      });
      expect(opentip.options.targetJoint.toString()).to.eql("bottom");
      opentip = new Opentip(element, {
        tipJoint: "bottomRight"
      });
      return expect(opentip.options.targetJoint.toString()).to.eql("topLeft");
    });
    it("should setup all trigger elements", function() {
      var element, opentip;
      element = adapter.create("<div></div>");
      opentip = new Opentip(element, {
        showOn: "click"
      });
      expect(opentip.showTriggersWhenHidden).to.eql([
        {
          event: "click",
          element: element
        }
      ]);
      expect(opentip.showTriggersWhenVisible).to.eql([]);
      expect(opentip.hideTriggers).to.eql([]);
      opentip = new Opentip(element, {
        showOn: "creation"
      });
      expect(opentip.showTriggersWhenHidden).to.eql([]);
      expect(opentip.showTriggersWhenVisible).to.eql([]);
      return expect(opentip.hideTriggers).to.eql([]);
    });
    it("should copy options.hideTrigger onto options.hideTriggers", function() {
      var element, opentip;
      element = adapter.create("<div></div>");
      opentip = new Opentip(element, {
        hideTrigger: "closeButton",
        hideTriggers: ["trigger"]
      });
      return expect(opentip.options.hideTriggers).to.eql(["trigger", "closeButton"]);
    });
    return it("should attach itself to the elements `data-opentips` property", function() {
      var element, opentip, opentip2, opentip3;
      element = $("<div></div>").get(0);
      expect(adapter.data(element, "opentips")).to.not.be.ok();
      opentip = new Opentip(element);
      expect(adapter.data(element, "opentips")).to.eql([opentip]);
      opentip2 = new Opentip(element);
      opentip3 = new Opentip(element);
      return expect(adapter.data(element, "opentips")).to.eql([opentip, opentip2, opentip3]);
    });
  });
  describe("init()", function() {
    return describe("showOn == creation", function() {
      var element;
      element = document.createElement("div");
      beforeEach(function() {
        return sinon.stub(Opentip.prototype, "prepareToShow");
      });
      afterEach(function() {
        return Opentip.prototype.prepareToShow.restore();
      });
      return it("should immediately call prepareToShow()", function() {
        var opentip;
        opentip = new Opentip(element, {
          showOn: "creation"
        });
        return expect(opentip.prepareToShow.callCount).to.equal(1);
      });
    });
  });
  describe("setContent()", function() {
    return it("should update the content if tooltip currently visible", function() {
      var element, opentip, stub;
      element = document.createElement("div");
      opentip = new Opentip(element, {
        showOn: "click"
      });
      stub = sinon.stub(opentip, "_updateElementContent");
      opentip.visible = false;
      opentip.setContent("TEST");
      expect(opentip.content).to.equal("TEST");
      opentip.visible = true;
      opentip.setContent("TEST2");
      expect(opentip.content).to.equal("TEST2");
      expect(stub.callCount).to.equal(1);
      return opentip._updateElementContent.restore();
    });
  });
  describe("_updateElementContent()", function() {
    it("should escape the content if @options.escapeContent", function() {
      var element, opentip;
      element = document.createElement("div");
      opentip = new Opentip(element, "<div><span></span></div>", {
        escapeContent: true
      });
      sinon.stub(opentip, "_triggerElementExists", function() {
        return true;
      });
      opentip.show();
      return expect($(opentip.container).find(".content").html()).to.be("&lt;div&gt;&lt;span&gt;&lt;/span&gt;&lt;/div&gt;");
    });
    return it("should not escape the content if not @options.escapeContent", function() {
      var element, opentip;
      element = document.createElement("div");
      opentip = new Opentip(element, "<div><span></span></div>", {
        escapeContent: false
      });
      sinon.stub(opentip, "_triggerElementExists", function() {
        return true;
      });
      opentip.show();
      return expect($(opentip.container).find(".content > div > span").length).to.be(1);
    });
  });
  describe("_buildContainer()", function() {
    var element, opentip;
    element = document.createElement("div");
    opentip = null;
    beforeEach(function() {
      return opentip = new Opentip(element, {
        style: "glass",
        showEffect: "appear",
        hideEffect: "fade"
      });
    });
    it("should set the id", function() {
      return expect(adapter.attr(opentip.container, "id")).to.equal("opentip-" + opentip.id);
    });
    return it("should set the classes", function() {
      var enderElement;
      enderElement = $(adapter.unwrap(opentip.container));
      expect(enderElement.hasClass("opentip-container")).to.be.ok();
      expect(enderElement.hasClass("hidden")).to.be.ok();
      expect(enderElement.hasClass("style-glass")).to.be.ok();
      expect(enderElement.hasClass("show-effect-appear")).to.be.ok();
      return expect(enderElement.hasClass("hide-effect-fade")).to.be.ok();
    });
  });
  describe("_buildElements()", function() {
    var element, opentip;
    element = opentip = null;
    beforeEach(function() {
      element = document.createElement("div");
      opentip = new Opentip(element, "the content", "the title", {
        hideTrigger: "closeButton",
        stem: "top left",
        ajax: {
          url: "bla"
        }
      });
      return opentip._buildElements();
    });
    it("should add a h1 if title is provided", function() {
      var enderElement, headerElement;
      enderElement = $(adapter.unwrap(opentip.container));
      headerElement = enderElement.find("> .opentip > header > h1");
      expect(headerElement.length).to.be.ok();
      return expect(headerElement.html()).to.be("the title");
    });
    it("should add a loading indicator if ajax", function() {
      var enderElement, loadingElement;
      enderElement = $(adapter.unwrap(opentip.container));
      loadingElement = enderElement.find("> .opentip > .loading-indicator > span");
      expect(loadingElement.length).to.be.ok();
      return expect(loadingElement.html()).to.be("Loading...");
    });
    return it("should add a close button if hideTrigger = close", function() {
      var closeButton, enderElement;
      enderElement = $(adapter.unwrap(opentip.container));
      closeButton = enderElement.find("> .opentip > header > a.close > span");
      expect(closeButton.length).to.be.ok();
      return expect(closeButton.html()).to.be("Close");
    });
  });
  describe("setAdapter()", function() {
    it("should set the current adapter, and add the adapter to the list");
    return it("should use adapter.domReady to call findElements() with it");
  });
  describe("_setupObservers()", function() {
    return it("should never setup the same observers twice");
  });
  return describe("_searchAndActivateCloseButtons()");
});
