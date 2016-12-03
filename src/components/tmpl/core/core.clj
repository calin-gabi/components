(ns dashboard.tmpl.core.core
  (:require
   [ak-dbg.core :refer :all]
   [hiccup.element :refer [javascript-tag]]
   [hiccup.page :refer [html5]]
   [dashboard.ctrl.template :refer [template response-wrap]]
   [environ.core :refer [env]]))

(defmethod template "main" [{:keys [] :as req}]
  (response-wrap
   [:div#main "My components"]))

(defn page [{:keys [] :as req}]  
  (html5
   {:lang "en"}

   [:head
    [:base {:href "/"}]
    [:meta {:charset "utf-8"}]
    [:meta {:name "viewport" :content "width=device-width, initial-scale=1.0"}]
    [:meta {:http-equiv "X-UA-Compatible" :content "IE=edge"}]
    [:title "Components"]
    #-[:link {:rel "stylesheet" :href "/node_modules/bootstrap/dist/css/bootstrap.min.css"} ]
    #_[:link {:rel "stylesheet" :href "/node_modules/jquery-ui/jquery-ui.min.css"} ]
    #_[:_ {:rel "stylesheet" :href "/node_modules/fullcalendar/dist/fullcalendar.min.css"} ]
    #_[:link {:rel "stylesheet" :href "/fonts/font-awesome-4.6.3/css/font-awesome.min.css"} ]
    #_[:script {:src "/node_modules/core-js/client/shim.min.js"}]
    #_[:script {:src "/node_modules/zone.js/dist/zone.js"}]
    #_[:script {:src "/node_modules/reflect-metadata/Reflect.js"}]
    #_[:script {:src "/node_modules/systemjs/dist/system.src.js"}]
    #_[:script {:src "/js/systemjs.config.js"}]
    [:script "System.import('app/core/boot').catch(function(err){console.error(err);});"]]

   [:body
    #_[:script {:src "/node_modules/jquery/dist/jquery.min.js"}]
    #_[:script {:src "/node_modules/jquery-ui/jquery-ui.min.js"}]
    #_[:script {:src "/node_modules/bootstrap/dist/js/bootstrap.min.js"}]
    #_[:script {:src "/node_modules/moment/min/moment.min.js"}]
    #_[:script {:src "/node_modules/fullcalendar/dist/fullcalendar.min.js"}]
    #_[:script {:src "/node_modules/fullcalendar/dist/locale-all.js"}]
    [:main
     (if (= (:dev env) "true")
       {:class "dev"})
     "Loading..."]]))
