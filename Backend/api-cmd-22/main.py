from flask import Flask, Response
from flask_cors import CORS
import json
import pandas as pd
from sklearn import linear_model
from sklearn.model_selection import train_test_split
import logging


def predict_demi_finale():

    data_matches = pd.read_csv("./SOURCES/matches.csv")
    data_matches["N° match"] = data_matches.index + 1
    data_matches = data_matches.drop(columns=['possession in contest'])

    print(data_matches)

    for index, row in data_matches.iterrows():  
        if row["number of goals team1"] > row["number of goals team2"]:
            data_matches.at[index, 'RESULT team1'] = 'G'
            data_matches.at[index, 'RESULT team2'] = 'P'
        elif row["number of goals team1"] == row["number of goals team2"]:
            data_matches.at[index, 'RESULT team1'] = 'N'
            data_matches.at[index, 'RESULT team2'] = 'N'
        else:
            data_matches.at[index, 'RESULT team1'] = 'P'
            data_matches.at[index, 'RESULT team2'] = 'G'

    data_matches_full = data_matches
    data_matches["RESULT"] = data_matches["RESULT team1"] + data_matches["RESULT team2"]
    #Suppression % char
    data_matches["possession team1"]=data_matches["possession team1"].map(lambda x: x.replace('%', ''))
    data_matches["possession team2"]=data_matches["possession team2"].map(lambda x: x.replace('%', ''))

    list_col = data_matches_full.columns
    
    list_col_filtered_t1 = []
    list_col_filtered_t2 = []
    for col in list_col:
        if 'team1' in col:
            list_col_filtered_t1.append(col)

    for col in list_col:
        if 'team2' in col:
            list_col_filtered_t2.append(col)
    
    df1 = data_matches_full[list_col_filtered_t1]
    
    #Suppression chiffre 1 dans nom de la colonne
    new_col=df1.columns.map(lambda x: x.replace('1', ''))
    df1.columns=new_col
    df1.rename(columns = {'team':'equipe'}, inplace = True)
    new_column=df1.columns.map(lambda x: x.replace(' team', ''))
    df1.columns=new_column

    #Suppression chiffre 1 dans nom de la colonne
    new_col=df1.columns.map(lambda x: x.replace('1', ''))
    df1.columns=new_col
    df1.rename(columns = {'team':'equipe'}, inplace = True)
    new_column=df1.columns.map(lambda x: x.replace(' team', ''))
    df1.columns=new_column

    df2 = data_matches_full[list_col_filtered_t2]
    #Suppression chiffre 2 dans nom de la colonne
    new_col_2=df2.columns.map(lambda x: x.replace('2', ''))
    df2.columns=new_col_2
    df2.rename(columns = {'team':'equipe'}, inplace = True)
    new_column2=df2.columns.map(lambda x: x.replace(' team', ''))
    df2.columns=new_column2

    frames = [df1, df2]

    df_final = pd.concat(frames)
    df_final['possession']
    df_final = df_final.astype({'possession':'float'})

    df_final.groupby(['equipe']).mean()
    df_stat_team = df_final.groupby(['equipe']).mean()

    #MODEL MACHINE LEARNING
    df_modele=data_matches.drop(columns=['team1','team2','category','RESULT team2', 'RESULT'])
    df_modele_numeric=data_matches.drop(columns=['team1','team2','category','RESULT team1','RESULT team2', 'RESULT'])

    target = df_modele[['RESULT team1']].replace(['G','N','P'],[2,1,0])

    list_columns = df_modele_numeric.columns
    features = df_modele_numeric[list_columns]

    Xtrain, Xtest, ytrain, ytest = train_test_split(features, target, train_size=0.75, stratify = target)

    #instanciation du modèle
    modele_regLog = linear_model.LogisticRegression(random_state = 0,
    solver = 'liblinear', multi_class = 'auto')
    #training
    modele_regLog.fit(Xtrain,ytrain)
    #précision du modèle
    precision = modele_regLog.score(Xtest,ytest)
    #précision du modèle
    precision = modele_regLog.score(Xtest,ytest)

    #PHASE DEPLOIEMENT
    df_stat_team = df_stat_team.reset_index(level=0)
    #MATCH 1
    teamArgentine=df_stat_team[df_stat_team['equipe'] == 'ARGENTINA']
    teamCroatie=df_stat_team[df_stat_team['equipe'] == 'CROATIA']

    #MATCH 2
    teamFrance=df_stat_team[df_stat_team['equipe'] == 'FRANCE']
    teamMaroc=df_stat_team[df_stat_team['equipe'] == 'MOROCCO']

    #Argentine
    #Ajout prefixe team1 dans nom de la colonne
    new_col=teamArgentine.columns.map(lambda x: x.replace(x, x + ' team1'))
    teamArgentine.columns=new_col
    teamArgentine=teamArgentine.rename(columns={"equipe team1": "team1"})
    teamArgentine['N° match']=1
    teamArgentine

    #Croatie
    #Ajout prefixe team2 dans nom de la colonne
    new_col=teamCroatie.columns.map(lambda x: x.replace(x, x + ' team2'))
    teamCroatie.columns=new_col
    teamCroatie=teamCroatie.rename(columns={"equipe team2": "team2"})
    teamCroatie['N° match']=1
    teamCroatie

    #MATCH DEMI1
    #Argentine - Croatie
    df_match1=teamArgentine.merge(teamCroatie, left_on='N° match', right_on='N° match')

    df_match1['N° match']=1

    #FRANCE
    #Ajout prefixe team1 dans nom de la colonne
    new_col=teamFrance.columns.map(lambda x: x.replace(x, x + ' team1'))
    teamFrance.columns=new_col
    teamFrance=teamFrance.rename(columns={"equipe team1": "team1"})
    teamFrance['N° match']=2
    teamFrance

    #Maroc
    #Ajout prefixe team1 dans nom de la colonne
    new_col=teamMaroc.columns.map(lambda x: x.replace(x, x + ' team2'))
    teamMaroc.columns=new_col
    teamMaroc=teamMaroc.rename(columns={"equipe team2": "team2"})
    teamMaroc['N° match']=2
    teamMaroc

    #MATCH DEMI2

    #France - MAROC
    df_match2=teamFrance.merge(teamMaroc, left_on='N° match', right_on='N° match')

    df_match2['N° match']=2

    data_prod=pd.concat([df_match1, df_match2])
    data_prod_numeric=data_prod.drop(columns=['team1', 'team2'])
    data_prod_numeric=data_prod_numeric.rename(columns={"completed line breaks team1":"completed line breaksteam1","completed defensive line breaksteam team1":"completed defensive line breaksteam1"})
    data_prod_numeric=data_prod_numeric[list_columns]

    # performing predictions on the train datdaset
    yhat = modele_regLog.predict(data_prod_numeric.values) 
    prediction_reglog = list(map(round, yhat))

    data_prod_numeric['RESULT team1']=prediction_reglog
    data_prod_numeric['team1']=[ df_match1['team1'].values[0], df_match2['team1'].values[0]]
    data_prod_numeric['team2']=[df_match1['team2'].values[0], df_match2['team2'].values[0]]

    #RESULTAT PREDICTION
    df_result = data_prod_numeric[['N° match',	'RESULT team1',	'team1',	'team2']]
    precision=precision*100

    result = df_result.to_json(orient="split")
    parsed = json.loads(result)
    parsed['precision']=precision

    print(parsed)

    return parsed
  

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/')
def root():
    response = "Hello Coupe Du Monde 2022"
    return Response(json.dumps(response),  mimetype='application/json')

@app.route('/api/v.1.0.0/result_match_demi')
def get_predict_demi_finale():
    response = predict_demi_finale()
    return Response(json.dumps(response),  mimetype='application/json')

@app.route('/api/v.1.0.0/result_match_finale')
def get_predict_finale():
    response = {
                'team':'France',
                'flag':'fi fi-fr'
    }
    return Response(json.dumps(response),  mimetype='application/json')

@app.route('/api/v.1.0.0/list_teams')
def get_list_teams():
    response = [
        {'id' : 1001,'name': 'France'},
        {'id' : 1002,'name': 'Maroc'},
        {'id' : 1003,'name': 'Argentine'},
        {'id' : 1004,'name': 'Croatie'}
    ]
    return Response(json.dumps(response),  mimetype='application/json')

@app.route('/api/v.1.0.0/list_players')
def get_list_players():

    response = [{'id' : 2001,'name': 'Joueur 1'},{'id' : 2002,'name': 'Joueur 2'},{'id' : 2003,'name': 'Joueur 3'},{'id' : 2004,'name': 'Joueur 4'}]
    return Response(json.dumps(response),  mimetype='application/json')

@app.errorhandler(500)
def server_error(e):
    # Log the error and stacktrace.
    logging.exception('An error occurred during a request.')
    return 'An internal error occurred.', 500

# port = 80
# if __name__ == '__main__':
#     app.run(host='', port=port)

if __name__ == '__main__':
   app.run(debug=True)