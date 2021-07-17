import { useEffect, useState } from 'react';
import './App.css';
import NewsCard from './components/NewsCard/NewsCard';
import alanBtn from '@alan-ai/alan-sdk-web';
import useStyles from './styles';
import wordsToNumbers from 'words-to-numbers';

const alanKey = "put your access key in here";

function App() {
  const classes = useStyles();
  const [articles, setArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({command, articles, number}) => {
        if(command === "newHeadlines") {
          setArticles(articles);
          setActiveArticle(-1);
        }else if(command === 'highlight') {
          setActiveArticle((preActiveArticle) => preActiveArticle + 1);
        }else if(command === 'open') {
          const num = number.length > 2 ? wordsToNumbers(number, {fuzzy: true}) : number;
          const article = articles[num - 1];
          if(num > 20) {
            alanBtn().playText("Please try that again...");
          }else if(article) {
            window.open(article.url, '_blank');
            alanBtn().playText("Opening");
          };
        };
      },
    });
  }, []);

  return (
    <div className="app">
      <div className={classes.logoContainer}>
        <img src="https://i0.wp.com/synqqblog.wpcomstaging.com/wp-content/uploads/2019/11/preview.jpg?fit=1200%2C630&ssl=1" alt="logo" className={classes.alanLogo} />
      </div>
      <NewsCard articles={articles} activeArticle={activeArticle} />
    </div>
  );
}

export default App;
