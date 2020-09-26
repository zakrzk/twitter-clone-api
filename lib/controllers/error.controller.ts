export const errorController = (req, res) => {
    res.status(404).send({err: '404 not found'})
};