# filRougeApi
Cette Api à été créée pour mon évaluation sur mon titre professionnel de concepteur développeur d'applications.
L'idée était de créer un serveur nodeJs utilisant les framework Hapi.dev et KnexJs qui pourrait recevoir les requêtes de l'application Java correspondante ([repo filRougeApp](https://github.com/AlexandreLourencinho/filRougeApp) et faire les modifications correspondantes en base de données.
L'ORM et la structure des entités y a été réalisé en collaboration avec mon maître de stage pendant icelui, que j'ai adapté ensuite à mes besoins, et permet d'affecter toutes les tables et de faire tout type de jointures dans les différentes requêtes.
L'application Java pouvait envoyer ses requêtes HTTP à cette API, qui interrogeait la base de données et envoyait la réponse à la requête sous forme de JSON, qui était ensuite utilisé du coté de l'application. 

