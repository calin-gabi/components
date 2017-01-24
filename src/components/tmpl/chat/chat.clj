(ns components.tmpl.chat.chat
  (:require
   [components.ctrl.template :refer [template response-wrap]]))

(defmethod template "chat" [{:keys [] :as req}]
  (response-wrap
    [:div#chat-component.container-fluid
      [:div.col-lg-4
        [:div.users
          [:div.search
            [:input
              {"[ngModel]" "users_filter"
                "(ngModelChange)" "filterChange($event)"
               :placeholder "type username ..."}]]
          [:div.userslist
            [:div.inline
              {"*ngFor" "let user of users"}
              [:div.username.span-overflow.left
                [:span "{{user.username}}"]]
              [:div.selected.right
                [:input 
                  {"[ngModel]" "user.selected"
                   "(ngModelChange)" "userSelected($event)"
                   :type "checkbox"}]]]]]
        [:div.chat-clients
          {"*ngFor" "let client of clients;"}
          [:div
            {"(click)" "selectClient(client)"}
            [:span 
              {"[class.online]" "client.online"}
              "{{client.username}}"]]]]
      [:div.chat-channel.col-lg-6
        [:div.message-container
          [:div.header
            "Chat with {{client.username}}"]
          [:div.messages-listrelative
            [:div.messages-list
              [:div.message.inline
                {"*ngFor" "let message of messages;"}
                [:div.inline
                  {"[class.my-message]" "myMessage(message)"}
                  [:span "{{message.message}}"]]]]]]

        [:div.footer
          [:div.send-text.inline
            [:input#text-tosend.left
            {"(keydown)" "keyDown($event)"
              "[(ngModel)]" "messageToSend"
              "[disabled]" "client.username === ''"
              :placeholder "Type your message ..."}]

            [:button.btn.right
            {"(click)" "send()"
              "[disabled]" "client.username === ''"} 
              "Send"]]]]]))
