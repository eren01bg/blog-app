const Category = require('../models/category');

exports.createCategories = async () => {

    const categoryNames = ['Technology', 'Sports', 'Politics', 'Entertainment', 'Fashion', 'Travel', 'Food', 'Health', 'Science', 'Business'];

    try {

        for (let i = 0; i < categoryNames.length; i++) {
            const category = new Category({
                name: categoryNames[i]
            });
            await category.save();
        }

        return true;
        

    }  catch (error) {
        console.error('Error creating categories:', error);
        return false;
    }
    
}



exports.getCategories = async (req, res, next) => {

    try {

        const categories = await Category.find();
        res.status(200).json(categories);

    } catch (error) {

        res.status(400).json({ error });

    }

}

exports.getCategoryCount = async () => {
    try {
        const count = await Category.countDocuments();
        return count;
    } catch (err) {
        console.log(err);
    }
};


exports.getCategoryById = async (req, res, next) => {
    
        const id = req.params.id;
    
        try {
    
            const category = await Category.findById(id);
    
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
    
            res.status(200).json(category);
    
        } catch (error) {
    
            res.status(400).json({ error });
    
        }
    
    }
