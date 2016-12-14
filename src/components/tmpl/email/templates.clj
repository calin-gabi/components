(ns components.tmpl.email.templates
  (:require
   [ak-dbg.core :refer :all]
   [hiccup.page :refer [html5]]))

(defn Hello [params]
  (html5 
    [:body
      [:div
        {:style "width: 320px; height:160px; background-color: gray"}
        [:svg 
          {:width "325"
            :height "160"
            :xmlns "http://www.w3.org/2000/svg"}
          [:circle 
            {:cx "80"
              :cy "80"
              :r "50"
              :fill "white"}]
          [:circle 
            {:cx "80"
              :cy "80"
              :r "32"
              :fill "#605E5E"}]
          [:path 
            {:d "M80 60
                A 20 20, 0, 0, 1, 80 100
                L 80 100 Z"
            :fill "#70E0AC"}]
          [:circle 
            {:cx "80"
              :cy "80"
              :r "12"
              :fill "#605E5E"}]]
        [:h3 
          {:style "color: yellow"}
            (str "Hello " (:name params))]]]))