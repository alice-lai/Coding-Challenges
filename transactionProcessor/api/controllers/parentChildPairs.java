parentChildPairs1 = [
    [1, 3], [2, 3], [3, 6], [5, 6], [5, 7], [4, 5],
    [4, 8], [4, 9], [9, 11], [14, 4], [13, 12], [12, 9]
]

no parents:
[1, 2, 13, 14] 

one parent:
[4, 5, 7, 8, 11, 12]

{
  1: 1
  2: 1
  3: 1
  5: 2
  6: 0
  7: 0
}

{
  1: 0
  3: 1
}


*/

class Solution {
  public static void main(String[] args) {
    int[][] parentChildPairs1 = {
      {1, 3}, {2, 3}, {3, 6}, {5, 6}, {5, 7}, {4, 5},
      {4, 8}, {4, 9}, {9, 11}, {14, 4}, {13, 12}, {12, 9}
      };
      
    parentRelationship(parentChildPairs1);
  }
  
  public static void parentRelationship(int[][] parentChildPairs1){
        
      Set<Integer> oneParentSet = new HashSet<>();
      Set<Integer> noParentsSet = new HashSet<>();
      Map<Integer, Integer> childParentCount = new HashMap<>();
      
      for(int i = 0; i < parentChildPairs1.length; i++){
        int currentKeyValue1 = parentChildPairs1[i][1];
        int currentKeyValue2 = parentChildPairs1[i][0];
        if(!childParentCount.containsKey(currentKeyValue1)){
          childParentCount.put(currentKeyValue1, 0);
        }
        if(!childParentCount.containsKey(currentKeyValue2)){
          childParentCount.put(currentKeyValue2, 0);
        }
          int currentParentValue = childParentCount.get(currentKeyValue1);
          childParentCount.put(currentKeyValue1, currentParentValue +1);
        
      }
    
      for(int key : childParentCount.keySet()){
        int parentCount = childParentCount.get(key);
        if(parentCount == 1){
          oneParentSet.add(key);
        }else if(parentCount == 0){
          noParentsSet.add(key);
        }
      } 
      System.out.println("oneParentSet: " + oneParentSet);
      System.out.println("noParentsSet: " + noParentsSet);
    }
}

