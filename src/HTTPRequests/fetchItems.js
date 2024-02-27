import axios from "axios";

export const fetchItemsIDByPages = async (offset, limit) => {
    const response = await axios.post(
        'https://api.valantis.store:41000/',
        {
            "action": "get_ids",
            "params": {"offset": offset, "limit": limit}
        },
        {
            headers: {
                'X-Auth': '30fec2904fe148b7fe7cc5eeb3df9d6'
            }
        }
    )
    return response.data
}