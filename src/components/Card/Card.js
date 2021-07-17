import React, {useState, useEffect, createRef} from 'react';
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import useStyles from './styles';
import classNames from 'classnames';

const CardItem = ({article, index, activeArticle}) => {
    const classes = useStyles();
    const [elRefs, setElRefs] = useState([]);
    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

    useEffect(() => {
        setElRefs((refs) => Array(20).fill().map((_, index) => refs[index] || createRef()));
    }, []);

    useEffect(() => {
        if(index === activeArticle && elRefs[activeArticle]) {
            scrollToRef(elRefs[activeArticle]);
        }
    }, [index, activeArticle, elRefs]);

    return (
        <Card ref={elRefs[index]} className={classNames(classes.card, activeArticle === index ? classes.activeCard : null)}>
            <CardActionArea href={article.url} target="_blank">
                <CardMedia className={classes.media} image={article.urlToImage || 'https://media.istockphoto.com/photos/breaking-news-world-news-with-map-backgorund-picture-id1182477852?k=6&m=1182477852&s=612x612&w=0&h=X-UipiiX5xcMw9dBhzKZWG7UcWjEOARl2s_oTVV8rtE='} />
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary" component="h2">{(new Date(article.publishedAt)).toDateString()}</Typography>
                    <Typography variant="body2" color="textSecondary" component="h2">{article.source.name}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom variant="h5">{article.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{article.description}</Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Button size="small" color="primary">Learn more</Button>
                    <Typography variant="h5" color="textSecondary">{index + 1}</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}

export default CardItem;
