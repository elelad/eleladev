/**
 * Created by Elad on 23/09/2016.
 */




i18next = window.i18next;
//i18nextXHRBackend = window.i18nextXHRBackend;

var jsonFromServer;

$.getJSON("locals/he.json", function (data) {
    jsonFromServer = data;
    i18next.init({
        lng: 'lng',
        resources: {
            lng: {
                translation: jsonFromServer
            }
        }
    }, (err, t) => {
        // initialized and ready to go!
        const hw = i18next.t('key'); // hw = 'hello world'
    });
    console.log(jsonFromServer);
    console.log("key:" + i18next.t('key'));
});




$(document).on("ready", function () {
    PPP.getProjectsFromJson();
    PPP.fillTechnology();
});

class Project {
    constructor(index, name, cover, logo, liveDemo, qr, shortDescription, description, gallery, features, using) {
        this.index = index;
        this.pName = name;
        this.pCover = cover;
        this.pLogo = logo;
        this.pLiveDemo = liveDemo;
        this.pQr = qr;
        this.pShortDescription = shortDescription;
        this.pDescription = description;
        this.pGallery = gallery;
        this.pFeatures = features;
        this.pUsing = using;
    }

    toModal() {
        $("#mLogo").attr("src", this.pLogo).attr("alt", this.pName + " logo");
        $("#mTitle").html(this.pName);
        $(".mLiveDemo").attr("href", this.pLiveDemo);
        $("#mDescription").html(this.pDescription);
        $("#mQr").attr("src", this.pQr).attr("alt", this.pName + " QR");
        $("#cIndicators").html("");
        $("#cInner").html("");
        $("#mFeatures").html("");
        $("#mUsing").html("");
        this.pGallery.forEach((sItem,sIndex) =>{
            let indicator = "";
            let inner = "";
            let active = "";
            if (sIndex == 0){
                active = " active";
            }
            indicator = `<li data-target="#carousel-example-generic" data-slide-to="${sIndex}" class="${active}"></li>`;
            inner = `<div class="item${active}">
                                        <img src="${sItem.src}" alt="${sItem.caption}">
                                        <div class="carousel-caption smartphone-caption">
                                            <span class="smartphone-caption-span">${sItem.caption}</span>
                                        </div>
                                    </div>`;
            $("#cIndicators").append(indicator);
            $("#cInner").append(inner);
        });
        $("#carousel-example-generic").carousel({
            interval: 2700
        });
        this.pFeatures.forEach(fItem =>{
            let li = `<li class="list-group-item col-md-4 col-xs-6">
                        <span class="glyphicon glyphicon-${fItem.icon}"></span>${fItem.feature}</li>`;
            $("#mFeatures").append(li);
        });
        this.pUsing.forEach((uItem) =>{
            let li = `<li class="list-group-item col-lg-1 col-md-2 col-xs-4">
                        <img src="${uItem.src}" alt="java" class="using-logos" data-toggle="tooltip" 
                        data-placement="top" title="${uItem.use}"></li>`;
            $("#mUsing").append(li);
        });
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })
    }

    toHtmlForProjectsList() {
        let modal = this.index;
        let html = `<figure class="effect-oscar  wowload fadeIn">
        <img src="${this.pCover}" alt="${this.pName}"/>
            <figcaption>
            <h2>${this.pName}</h2>
            <p>${this.pShortDescription}</p>
            <p><a href="#" onclick="PPP.projects[${this.index}].toModal()" data-toggle="modal" data-target="#projectsModal">View more</a></p>
        </figcaption>
        </figure>`;
        return html;
    }
}

var PPP = {};
PPP.projects = [];
PPP.addProject = function (project) {
    this.projects.push(project);
};

PPP.allToProjectList = function () {
    this.projects.forEach(project => {
        $("#works").html($("#works").html() + project.toHtmlForProjectsList());
    })
};


PPP.getProjectsFromJson = function () {
    $.getJSON("assets/dataProjects/projects.json", function (data) {
        data.projects.forEach(item => {
            PPP.addProject(new Project(PPP.projects.length, item.name, item.cover, item.logo, item.liveDemo, item.QR, item.shortDescription,
                item.description, item.gallery, item.features, item.using))
        });
        PPP.allToProjectList();
    });
};

PPP.fillTechnology = function () {
    $.getJSON("assets/dataProjects/projects.json", function (data) {
        data.using.forEach(tItem => {//<p>${tItem.use}</p>
            let li = `<li class="list-group-item col-lg-2 col-md-2 col-sm-3 col-xs-4"><div class="roundLi">
                        <img src="${tItem.src}" alt="java" class="using-logos" data-toggle="tooltip" 
                        data-placement="top" title="${tItem.use}">
                        </div>
                        </li>`;
            $("#mTechnology").append(li);
        });
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })
    });
};
