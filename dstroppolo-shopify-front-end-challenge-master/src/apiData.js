let page_1 = 
    
    
    {
    "menus": [
      {
        "id": 1,
        "data": "House",
        "child_ids": [
          3,
          4
        ]
      },
      {
        "id": 2,
        "data": "Company",
        "child_ids": [
          8,
          9,
          11
        ]
      },
      {
        "id": 3,
        "data": "Kitchen",
        "parent_id": 1,
        "child_ids": [
          5,
          18
        ]
      },
      {
        "id": 4,
        "data": "Living Room",
        "parent_id": 1,
        "child_ids": [
          6,
          7,
          19
        ]
      },
      {
        "id": 5,
        "data": "Sink",
        "parent_id": 3,
        "child_ids": [
          
        ]
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 5,
      "total": 21
    }

}

let page_2 = 
{
    "menus": [
      {
        "id": 6,
        "data": "TV",
        "parent_id": 4,
        "child_ids": [
          
        ]
      },
      {
        "id": 7,
        "data": "Chair",
        "parent_id": 4,
        "child_ids": [
          20
        ]
      },
      {
        "id": 8,
        "data": "Meeting Rooms",
        "parent_id": 2,
        "child_ids": [
          
        ]
      },
      {
        "id": 9,
        "data": "Kitchen",
        "parent_id": 2,
        "child_ids": [
          10
        ]
      },
      {
        "id": 10,
        "data": "Oven",
        "parent_id": 9,
        "child_ids": [
          
        ]
      }
    ],
    "pagination": {
      "current_page": 2,
      "per_page": 5,
      "total": 21
    }
  }

 let page_3 = 
 {
    "menus": [
      {
        "id": 11,
        "data": "HR",
        "parent_id": 2,
        "child_ids": [
          
        ]
      },
      {
        "id": 12,
        "data": "Computer",
        "child_ids": [
          13,
          14,
          15
        ]
      },
      {
        "id": 13,
        "data": "CPU",
        "parent_id": 12,
        "child_ids": [
          
        ]
      },
      {
        "id": 14,
        "data": "Motherboard",
        "parent_id": 12,
        "child_ids": [
          
        ]
      },
      {
        "id": 15,
        "data": "Peripherals",
        "parent_id": 12,
        "child_ids": [
          16,
          17,
          21
        ]
      }
    ],
    "pagination": {
      "current_page": 3,
      "per_page": 5,
      "total": 21
    }
  }

  let page_4 =

  {
    "menus": [
      {
        "id": 16,
        "data": "Mouse",
        "parent_id": 15,
        "child_ids": [
          
        ]
      },
      {
        "id": 17,
        "data": "Keyboard",
        "parent_id": 15,
        "child_ids": [
          
        ]
      },
      {
        "id": 18,
        "data": "Chair",
        "parent_id": 3,
        "child_ids": [
          
        ]
      },
      {
        "id": 19,
        "data": "Table",
        "parent_id": 4,
        "child_ids": [
          
        ]
      },
      {
        "id": 20,
        "data": "Pad",
        "parent_id": 7,
        "child_ids": [
          1
        ]
      }
    ],
    "pagination": {
      "current_page": 4,
      "per_page": 5,
      "total": 21
    }
  }

  let page_5 = 
  
  {
    "menus": [
      {
        "id": 21,
        "data": "Headphones",
        "parent_id": 15,
        "child_ids": [
          
        ]
      }
    ],
    "pagination": {
      "current_page": 5,
      "per_page": 5,
      "total": 21
    }
  }


export default [page_1, page_2, page_3, page_4, page_5];





  