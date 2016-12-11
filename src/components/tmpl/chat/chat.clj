(ns components.tmpl.chat.chat
  (:require
   [components.ctrl.template :refer [template response-wrap]]))

(defmethod template "chat" [{:keys [] :as req}]
  (response-wrap
   [:div#chat-board.left
    #_[:div.message-container
     [:div.messages-listrelative
      [:div.messages-list
       [:div.message.inline
        {"*ngFor" "let message of messages;"}
        [:div.inline
         {"[class.my-message]" "message.sUsername === 'trainer'"}
         [:span "{{message.payload.msg}}"]]]]]]

    [:div.footer
     [:div.send-text.inline
      [:input#text-tosend.left
       #_{"(keydown)" "keyDown($event)"
        "[(ngModel)]" "messageToSend"
        :placeholder "Type your message ..."}]

      [:div#send-msg.right
       {"(click)" "send()"} "Send"]]]]))
