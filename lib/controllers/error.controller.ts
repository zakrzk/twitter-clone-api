export const errorController = (req, res) => {
    res.status(404).send({message: '404 not found'})
};