import React from "react";
import { Link } from "react-router-dom";
import { Typography, Grid, Avatar, Card, CardHeader, CardMedia, CardContent, Divider } from "@material-ui/core";
import "./styles.css"; 
import axios from "axios";

class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: null,
      user: null
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  // Fetch data from the server
  fetchData() {
    const userId = this.props.match.params.userId;
    if (userId) {
      const photoUrl = `http://localhost:3000/photosOfUser/${userId}`;
      const userUrl = `http://localhost:3000/user/${userId}`;

      axios.all([
        axios.get(photoUrl),
        axios.get(userUrl)
      ])
      .then(axios.spread((photoResponse, userResponse) => {
        console.log("** Success: fetched data from server **");
        this.setState({ photos: photoResponse.data, user: userResponse.data });
        this.props.handler(`${userResponse.data.first_name} ${userResponse.data.last_name}`);
      }))
      .catch(error => {
        console.error("** Error fetching data:", error);
      });
    }
  }

  render() {
    const { photos, user } = this.state;

    return photos ? (
      <Grid container justifyContent="center" spacing={3}>
        {photos.map((photo) => (
          <Grid item xs={12} sm={6} md={4} key={photo._id}>
            <Card variant="outlined">
              <CardHeader
                title={
                  <Link to={`/users/${user._id}`} style={{ textDecoration: 'none', color: '#007bff' }}> 
                    {`${user.first_name} ${user.last_name}`}
                  </Link>
                }
                subheader={new Date(photo.date_time).toLocaleString()}
                avatar={<Avatar style={{ backgroundColor: '#FF7F50' }}>{user.first_name[0]}</Avatar>}
              />
              <CardMedia
                component="img"
                image={`./images/${photo.file_name}`}
                alt="Author Post"
                style={{ height: 400 }} 
              />
              <CardContent>
                {photo.comments && (
                  <>
                    <Typography variant="subtitle1">
                      Comments:
                    </Typography>
                    <Divider />
                  </>
                )}
                {photo.comments && photo.comments.length > 0 ? (
                  photo.comments.map((comment) => (
                    <div key={comment._id} style={{ marginTop: 10, backgroundColor: '#f4f4f4', padding: 10, borderRadius: 5 }}>
                      <Typography variant="subtitle2">
                        <Link to={`/users/${comment.user._id}`} style={{ textDecoration: 'none', color: '#007bff' }}>
                          {`${comment.user.first_name} ${comment.user.last_name}`}
                        </Link>
                      </Typography>
                      <Typography variant="caption" color="textSecondary" gutterBottom>
                        {new Date(comment.date_time).toLocaleString()}
                      </Typography>
                      <Typography variant="body1">
                        {`"${comment.comment}"`}
                      </Typography>
                    </div>
                  ))
                ) : (
                  <Typography variant="body2" style={{ fontStyle: 'italic', marginTop: 10 }}>
                    No comments for this photo.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    ) : (
      <div>Loading User Photos...</div>
    );
  }
}

export default UserPhotos;
