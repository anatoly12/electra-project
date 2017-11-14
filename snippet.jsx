  render() {

    return (<div>
              <List>
                {this.props.monitors.map( (monitor, index) => {

                    let statusColor = ( monitor.notifications == 0 ) ? red500 : grey500;

                    return (<Grid key={index}>
                                <Row>
                                  <Col md={12}>{monitor.name}</Col>
                                </Row>
                                <Row className="show-grid">
                                  <Col md={4}><Checkbox /></Col>
                                  <Col md={4}><Checkbox /></Col>
                                  <Col md={4}><Checkbox /></Col>
                                </Row>
                           </Grid>
                           );
                })
              }
            </List>
          </div>);
  }
