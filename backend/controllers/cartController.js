import userModel from '../models/userModel.js';

// add items to user cart

// const addToCart = async (req, res) => {
//     try {
//         let userData = await userModel.findById(req.body.userId);
//         let cartData = await userData.cartData;
//         if(!cartData[req.body.itemId]){
//             cartData[req.body.itemId] = 1
//         }
//         else {
//             cartData[req.body.itemId] += 1;
//         }
//         await userModel.findByIdAndUpdate(req.body.userId, {cartData});
//         res.json({message: "Item added to cart successfully"});
//     } catch (error) {
//         console.log(error);
//         res.json({message: "Error adding item to cart"});   
//     }
// }

// const addToCart = async (req, res) => {
//   try {
//     const { userId, itemId } = req.body;

//     if (!itemId) return res.status(400).json({ message: "Item ID is missing" });

//     let userData = await userModel.findById(userId);
//     let cartData = userData.cartData || {};

//     const currentQty = cartData[itemId] || 0;
//     cartData[itemId] = currentQty + 1;

//     await userModel.findByIdAndUpdate(userId, { cartData });

//     res.json({ message: "Item added to cart successfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Error adding item to cart" });
//   }
// };

const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    console.log("userId received:", userId);
    console.log("itemId received:", itemId);

    if (!itemId || !userId) {
      return res.status(400).json({ message: "Item ID or user ID is missing" });
    }

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartData = userData.cartData || {};
    const currentQty = cartData[itemId] || 0;
    cartData[itemId] = currentQty + 1;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ message: "Item added to cart successfully" });
  } catch (error) {
    console.log("🔴 Add to cart error:", error);
    res.status(500).json({ message: "Error adding item to cart" });
  }
};



// remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({message: "Item removed from cart successfully"});
    } catch (error) {
        console.log(error);
        res.json({message: "Error removing item from cart"}); 
    }
}

// fetch user cart data
// const getCart = async (req, res) => {
//     try {
//         let userData = await userModel.findById(req.body.userId);
//         let cartData = await userData.cartData;
//         res.json({success:true, cartData});   
//     } catch (error) {
//         console.log(error);
//         res.json({success:false, message: "Error fetching cart data"});
//     }
// }

const getCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ cartData: user.cartData || {} });
  } catch (error) {
    console.log("🔴 Error in getCart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export { addToCart, removeFromCart, getCart };