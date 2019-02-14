import { render, Component } from 'inferno';
import { Data } from './interfaces';
import * as Papa from 'papaparse';

import './Main.css';

const container = document.getElementById('app');
const csvUrl = 'data-dumps/dumps/killed_by_police.csv';

interface State {
  results: Array<Data>;
}

class Index extends Component<any, State> {
  state: State = {
    results: []
  };


  componentDidMount() {
    this.fetchCSVData().then(d => this.setState({results: d}));
  }

  render() {
    return (
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <h1><a class="text-body" href="https://github.com/dessalines/killed-by-police-frontend">Killed By Police</a></h1>
            <div>{this.table()}</div>
          </div>
        </div>
      </div>
    );
  }

  table() {
    return (
      <div>
        <div class="table-responsive">
          <table class="table table-fixed table-hover table-sm table-striped sortable-theme-bootstrap" data-sortable>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Age</th>
                <th>Sex</th>
                <th>Race</th>
                <th>State</th>
                <th>Cause</th>
                <th>Links</th>
              </tr>
            </thead>
            <tbody>
              {this.state.results.map(r => (
                <tr>
                  <td>{r.date}</td>
                  <td>{r.name}</td>
                  <td>{r.age}</td>
                  <td>{r.sex}</td>
                  <td>{r.race}</td>
                  <td>{r.state}</td>
                  <td>{r.cause}</td>
                  <td>
                    {r.fb_url ? <a href={r.fb_url}>FB </a> : ""}
                    {r.news_url ? <a href={r.news_url}>News</a> : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  fetchCSVData(): Promise<Array<Data>> {
    return fetch(csvUrl)
    .then(data => data.text())
    .then(data => Papa.parse(data))
    .then(data => {
      let out: Array<Data> = [];
      let rows = data.data;
      rows.shift();
      for (const row of rows.reverse()) {
        let fb: string = (' ' + row[11]).slice(1).slice(1,-1);
        let fbUrl = (fb) ? `https://${fb}` : undefined;
        let news: string = (' ' + row[12]).slice(1).slice(1,-1);
        let newsUrl = (news) ? news : undefined;
        if (row[3]) {
          out.push({
            date: row[2],
            state: row[3],
            sex: row[4],
            race: row[5],
            name: row[7],
            age: row[8],
            cause: (row[10]) ? row[10].slice(1,-1): undefined,
            fb_url: fbUrl, 
            news_url: newsUrl
          });
        }
      }
      return out.sort((a, b) => a.date.localeCompare(b.date)).reverse();
    });
  }

}

render(<Index />, container);
