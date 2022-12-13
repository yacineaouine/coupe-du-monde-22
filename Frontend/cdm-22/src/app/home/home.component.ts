import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  progress: boolean = false;

  playDemi1: boolean = false;
  playDemi2: boolean = false;
  disablePlayFinale: boolean = true;

  winner: any = {};
  winnerWorldCup: boolean = false;

  showEighth: boolean = false;
  showQuarter: boolean = false;


  list_huitiemes: any[] = [
    {
      date: "Sam. 03/12",
      team1: {
        flag: 'fi fi-nl',
        name: 'Pays-Bas',
        score: '3',
        winner: true
      },
      team2: {
        flag: 'fi fi-us',
        name: 'États-Unis',
        score: '1',
        winner: false
      }
    },
    {
      date: "Sam. 03/12",
      team1: {
        flag: 'fi fi-ar',
        name: 'Argentine',
        score: '2',
        winner: true
      },
      team2: {
        flag: 'fi fi-au',
        name: 'Australie',
        score: '1',
        winner: false
      }
    },
    {
      date: "Lun. 05/12",
      team1: {
        flag: 'fi fi-jp',
        name: 'Japon',
        score: '1 (1)',
        winner: false
      },
      team2: {
        flag: 'fi fi-hr',
        name: 'Croatie',
        score: '1 (3)',
        winner: true
      }
    },
    {
      date: "Lun. 05/12",
      team1: {
        flag: 'fi fi-br',
        name: 'Brésil',
        score: '4',
        winner: true
      },
      team2: {
        flag: 'fi fi-kr',
        name: 'Corée du Sud',
        score: '1',
        winner: false
      }
    },
    {
      date: "Dim. 04/12",
      team1: {
        flag: 'fi fi-fr',
        name: 'France',
        score: '3',
        winner: true
      },
      team2: {
        flag: 'fi fi-pl',
        name: 'Pologne',
        score: '1',
        winner: false
      }
    },
    {
      date: "Dim. 04/12",
      team1: {
        flag: 'fi fi-gb',
        name: 'Angleterre',
        score: '3',
        winner: true
      },
      team2: {
        flag: 'fi fi-sn',
        name: 'Sénégal',
        score: '0',
        winner: false
      }
    },
    {
      date: "Mar. 06/12",
      team1: {
        flag: 'fi fi-ma',
        name: 'Maroc',
        score: '0 (3)',
        winner: true
      },
      team2: {
        flag: 'fi fi-es',
        name: 'Espagne',
        score: '0 (0)',
        winner: false
      }
    },
    {
      date: "Mar. 06/12",
      team1: {
        flag: 'fi fi-pt',
        name: 'Portugal',
        score: '6',
        winner: true
      },
      team2: {
        flag: 'fi fi-ch',
        name: 'Suisse',
        score: '1',
        winner: false
      }
    }
  ];

  list_quart: any[] = [
    {
      date: "Ven. 09/12",
      team1: {
        flag: 'fi fi-nl',
        name: 'Pays-Bas',
        score: '2 (3)',
        winner: false
      },
      team2: {
        flag: 'fi fi-us',
        name: 'Argentine',
        score: '2 (4)',
        winner: true
      }
    },
    {
      date: "Ven. 09/12",
      team1: {
        flag: 'fi fi-hr',
        name: 'Croatie',
        score: '1 (4)',
        winner: true
      },
      team2: {
        flag: 'fi fi-br',
        name: 'Brésil',
        score: '1 (2)',
        winner: false
      }
    },
    {
      date: "Sam. 10/12",
      team1: {
        flag: 'fi fi-gb',
        name: 'Angleterre',
        score: '1',
        winner: false
      },
      team2: {
        flag: 'fi fi-fr',
        name: 'France',
        score: '2',
        winner: true
      }
    },
    {
      date: "Sam. 10/12",
      team1: {
        flag: 'fi fi-ma',
        name: 'Maroc',
        score: '1',
        winner: true
      },
      team2: {
        flag: 'fi fi-pt',
        name: 'Portugal',
        score: '0',
        winner: false
      }
    }
  ];

  list_demi: any[] = [
    {
      precision_modele: null,
      played: false,
      date: "Mar. 13/12",
      team1: {
        flag: 'fi fi-ar',
        name: 'Argentine',
        score: '',
        winner: false
      },
      team2: {
        flag: 'fi fi-hr',
        name: 'Croatie',
        score: '',
        winner: false
      }
    },
    {
      precision_modele: null,
      played: false,
      date: "Mer. 14/12",
      team1: {
        flag: 'fi fi-fr',
        name: 'France',
        score: '',
        winner: false
      },
      team2: {
        flag: 'fi fi-ma',
        name: 'Maroc',
        score: '',
        winner: false
      }
    }
  ];

  list_finale: any[] = [
    {
      played: false,
      date: "Dim. 18/12",
      team1: {
        flag: '',
        name: '',
        score: '',
        winner: false
      },
      team2: {
        flag: '',
        name: '',
        score: '',
        winner: false
      }
    }
  ];

  list_phase: any[] = [
    {
      name: "Huitièmes de finale",
      list_matchs: this.list_huitiemes 
    },
    {
      name: "Quats de finale",
      list_matchs: this.list_quart 
    },
    {
      name: "Demi-finale",
      list_matchs: this.list_demi 
    },
    {
      name: "Finale",
      list_matchs: this.list_finale 
    }
  ];



  constructor(private api: ApiService) {

  }

  ngOnInit() {}


  playGame(game: any, indexMatch: number) {

 
      switch (indexMatch) {
        case 0:
            this.playDemi1 = true;
            game.played = true;
            this.playGameDemi1();
            break;
        case 1:
            this.playDemi2 = true;
            game.played = true;
            this.playGameDemi2();
            break;
      };

      this.disableFinalBtn();

  }

  
  playGameDemi1() {

    this.progress = true;

    this.api.getResultMatchDemi()
    .subscribe(
      response => {

        this.winner = response;

        let result=response.data[0][1];

        let team1Winner = {
          flag: '',
          name: '',
          score: '',
          winner: false
        };

        switch(result) {
          case 0:
              this.list_demi[0].team1.winner=false;
              this.list_demi[0].team1.score='0';
              this.list_demi[0].team2.winner=true;
              this.list_demi[0].team2.score='1';

            //Ajout equipe gagnante à la phase finale
            team1Winner.flag = this.list_demi[0].team2.flag;
            team1Winner.name = this.list_demi[0].team2.name;

            this.list_finale[0].team1 = team1Winner

              break;
          case 1:
            this.list_demi[0].team1.winner=false;
            this.list_demi[0].team1.score='1';
            this.list_demi[0].team2.winner=false;
            this.list_demi[0].team2.score='1';
              break;
          case 2:
            this.list_demi[0].team1.winner=true;
            this.list_demi[0].team1.score='1';
            this.list_demi[0].team2.winner=false;
            this.list_demi[0].team2.score='0';

            //Ajout equipe gagnante à la phase finale
            team1Winner.flag = this.list_demi[0].team1.flag;
            team1Winner.name = this.list_demi[0].team1.name;

            this.list_finale[0].team1 = team1Winner;

            break;
          
        };
  
        this.list_demi[0].precision_modele=response.precision;


        this.progress = false;

      }
    )

  } 
  
  playGameDemi2() {

    this.progress = true;

    this.api.getResultMatchDemi()
    .subscribe(
      response => {

        this.winner = response;

        let result=response.data[1][1];

        let team2Winner = {
          flag: '',
          name: '',
          score: '',
          winner: false
        };

        switch(result) {
          case 0:
              this.list_demi[1].team1.winner=false;
              this.list_demi[1].team1.score='0';
              this.list_demi[1].team2.winner=true;
              this.list_demi[1].team2.score='1';
              
            //Ajout equipe gagnante à la phase finale
            team2Winner.flag = this.list_demi[1].team2.flag;
            team2Winner.name = this.list_demi[1].team2.name;

            this.list_finale[0].team2 = team2Winner;

              break;
          case 1:
            this.list_demi[1].team1.winner=false;
            this.list_demi[1].team1.score='1';
            this.list_demi[1].team2.winner=false;
            this.list_demi[1].team2.score='1';
              break;
          case 2:
            this.list_demi[1].team1.winner=true;
            this.list_demi[1].team1.score='1';
            this.list_demi[1].team2.winner=false;
            this.list_demi[1].team2.score='0';

            //Ajout equipe gagnante à la phase finale
            team2Winner.flag = this.list_demi[1].team1.flag;
            team2Winner.name = this.list_demi[1].team1.name;

            this.list_finale[0].team2 = team2Winner;

            break;
          
        };
  

        this.list_demi[1].precision_modele=response.precision;

        this.progress = false;

      }
    )
    
  } 

  playFinalGame(game: any) {

    
    this.progress = true;

    setTimeout(()=> {
      this.winnerWorldCup = true;
      this.progress = false;

    }, 4000);

  }

  disableFinalBtn() {

    if(this.playDemi1 && this.playDemi2) this.disablePlayFinale = false;
    else this.disablePlayFinale = true;

  }

  showEighthAction(state: boolean) {

    console.log(state);
    this.showEighth = !state;

  }

  showQuarterAction(state: boolean) {

    console.log(state);
    this.showQuarter = !state;

  }

}
